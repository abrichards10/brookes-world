#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import process from 'node:process'

function parseArgs(argv) {
  const args = { branch: '', logJson: false }
  const a = argv.slice(2)
  for (let i = 0; i < a.length; i += 1) {
    const k = a[i]
    if (k === '--branch') {
      args.branch = a[++i] || ''
    } else if (k === '--log-json') {
      args.logJson = true
    }
  }
  if (!args.branch) {
    args.branch = process.env.GITHUB_REF_NAME || ''
  }
  return args
}

function readDefaultBranchFromEvent() {
  try {
    const p = process.env.GITHUB_EVENT_PATH
    if (!p) return ''
    const evt = JSON.parse(fs.readFileSync(p, 'utf8'))
    return (evt && evt.repository && evt.repository.default_branch) || ''
  } catch {
    return ''
  }
}

const GH_API = 'https://api.github.com'

async function ghRequest(method, path, body, retry = 2) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ''
  if (!token) throw new Error('GITHUB_TOKEN is required')
  const url = `${GH_API}${path}`
  for (let i = 0; i <= retry; i += 1) {
    try {
      const resp = await fetch(url, {
        method,
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'pr-automation-script',
        },
        body: body ? JSON.stringify(body) : undefined,
      })
      if (!resp.ok) {
        const txt = await resp.text()
        if ((resp.status >= 500 || /fetch failed/i.test(txt)) && i < retry) {
          await new Promise((r) => setTimeout(r, 700 * (i + 1)))
          continue
        }
        const err = new Error(`GitHub ${resp.status} ${txt}`)
        err.status = resp.status
        err.responseText = txt
        err.url = url
        throw err
      }
      return await resp.json()
    } catch (e) {
      if (i < retry) {
        await new Promise((r) => setTimeout(r, 700 * (i + 1)))
        continue
      }
      throw e
    }
  }
}

function callChangelog(branch, existing, commits) {
  const input = JSON.stringify({ branch, existing, commits })
  // eslint-disable-next-line sonarjs/no-os-command-from-path -- CI script, node path is safe
  const out = execFileSync('node', ['tools/ai_changelog.mjs'], {
    input,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'inherit'],
  })
  return out.trim()
}

async function main() {
  const { branch } = parseArgs(process.argv)
  if (!branch) return
  const repoFull = process.env.GITHUB_REPOSITORY || ''
  const [owner, repo] = repoFull.split('/')
  if (!owner || !repo) throw new Error('GITHUB_REPOSITORY missing')

  const headRef = `${owner}:${branch}`
  // Find open PR for this head regardless of base
  const open = await ghRequest(
    'GET',
    `/repos/${owner}/${repo}/pulls?state=open&head=${encodeURIComponent(headRef)}`,
  )
  let pr = open[0] || null
  // If none, ensure no closed PR and create only when ahead of default branch
  if (!pr) {
    const closed = await ghRequest(
      'GET',
      `/repos/${owner}/${repo}/pulls?state=closed&head=${encodeURIComponent(headRef)}`,
    )
    if (closed && closed.length) {
      // Allow recreation only if ALL prior PRs from this branch were merged
      const hasUnmergedClosed = closed.some((c) => !c.merged_at)
      if (hasUnmergedClosed) return
      // otherwise continue to create a new PR (previous one(s) merged)
    }
    const cmp = await ghRequest(
      'GET',
      `/repos/${owner}/${repo}/compare/${encodeURIComponent('main')}...${encodeURIComponent(branch)}`,
    )
    if (!cmp || (cmp.ahead_by || 0) === 0) return
    const messages = (cmp.commits || [])
      .map((c) => `- ${String((c.commit && c.commit.message) || '').replace(/\n+/g, ' ')}`)
      .join('\n')
    const title = `branch: ${branch}`
    const headSha =
      cmp.commits && cmp.commits.length
        ? cmp.commits[cmp.commits.length - 1].sha
        : (cmp.merge_base_commit && cmp.merge_base_commit.sha) || ''
    const bullets = callChangelog(branch, '', messages)
    const body = `## Changes\n\n<!-- changelog-last-sha: ${headSha} -->\n<!-- changelog-begin -->\n${bullets}\n<!-- changelog-end -->\n`
    // Try to create; on 422 re-query and proceed
    try {
      pr = await ghRequest('POST', `/repos/${owner}/${repo}/pulls`, {
        head: branch,
        base: 'main',
        title,
        body,
        draft: true,
        maintainer_can_modify: true,
      })
    } catch (e) {
      if (e.status === 422) {
        const again = await ghRequest(
          'GET',
          `/repos/${owner}/${repo}/pulls?state=open&head=${encodeURIComponent(headRef)}`,
        )
        pr = again[0] || null
        if (!pr) return // bail if not visible
      } else {
        throw e
      }
    }
  }

  if (!pr) return
  const prNum = pr.number
  const baseRef = (pr.base && pr.base.ref) || readDefaultBranchFromEvent() || 'main'
  // load latest PR
  pr = await ghRequest('GET', `/repos/${owner}/${repo}/pulls/${prNum}`)
  const originalBody = String(pr.body || '')
  let body = originalBody
  const lastShaRe = /<!--\s*changelog-last-sha:\s*([a-f0-9]+)\s*-->/i
  const begin = '<!-- changelog-begin -->'
  const end = '<!-- changelog-end -->'
  const CHANGES = '## Changes'
  const hasHeader = body.includes(CHANGES)
  const hasManaged = body.includes(begin) && body.includes(end)
  if (!hasManaged) {
    if (!hasHeader) body += `\n\n${CHANGES}\n\n${begin}\n${end}\n`
    else {
      const hIdx = body.indexOf(CHANGES)
      const nl = body.indexOf('\n', hIdx)
      body =
        nl >= 0
          ? body.slice(0, nl + 1) + `${begin}\n${end}\n` + body.slice(nl + 1)
          : body + `\n${begin}\n${end}\n`
    }
  }
  let lastSha = (body.match(lastShaRe) || [null, null])[1]

  // Compare base...branch and compute new range
  const cmp2 = await ghRequest(
    'GET',
    `/repos/${owner}/${repo}/compare/${encodeURIComponent(baseRef)}...${encodeURIComponent(branch)}`,
  )
  const allCommits = cmp2.commits || []
  const headSha2 = allCommits.length
    ? allCommits[allCommits.length - 1].sha
    : (cmp2.merge_base_commit && cmp2.merge_base_commit.sha) || ''
  let startIdx = -1
  if (lastSha) startIdx = allCommits.findIndex((c) => c.sha === lastSha)
  const newCommits = startIdx >= 0 ? allCommits.slice(startIdx + 1) : allCommits
  const bIdx = body.indexOf(begin)
  const eIdx = body.indexOf(end)
  let existingSection =
    bIdx !== -1 && eIdx !== -1 && eIdx > bIdx
      ? body.slice(bIdx + begin.length, eIdx).trimStart()
      : ''
  existingSection = existingSection.replace(/^[^\n-]*\n?/, '').trim()
  const messagesNew = newCommits
    .map((c) => `- ${String((c.commit && c.commit.message) || '').replace(/\n+/g, ' ')}`)
    .join('\n')
  if (messagesNew) {
    const rawNew = callChangelog(branch, existingSection, messagesNew)
    const newLines = rawNew
      ? rawNew
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
      : []
    const existingLines = existingSection ? existingSection.split('\n').filter(Boolean) : []
    const merged = existingLines.concat(newLines)
    const newManaged = merged.join('\n')
    body = body.slice(0, bIdx + begin.length) + `\n${newManaged}\n` + body.slice(eIdx)
  }
  // Update last-sha
  if (lastShaRe.test(body))
    body = body.replace(lastShaRe, `<!-- changelog-last-sha: ${headSha2} -->`)
  else body = body.replace(begin, `<!-- changelog-last-sha: ${headSha2} -->\n${begin}`)

  // Do not modify PR title on updates; only update body if changed
  const payload = { body }
  const bodyChanged = body !== originalBody
  if (!bodyChanged) return // nothing to update
  await ghRequest('PATCH', `/repos/${owner}/${repo}/pulls/${prNum}`, payload)
}

main().catch((e) => {
  console.error(String(e))
  process.exit(1)
})
