#!/usr/bin/env node
import { Buffer } from 'node:buffer';
import process from 'node:process';

function dedupe(existing, candidates) {
  const set = new Set(existing.split('\n').map(s => s.trim()).filter(Boolean));
  return candidates.filter(s => s.startsWith('- ') && !set.has(s));
}

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const input = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
  const branch = input.branch || '';
  const existing = input.existing || '';
  const commits = input.commits || '';
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-5-2025-08-07';
  if (!apiKey) {
    console.error('OPENAI_API_KEY is required');
    process.exit(1);
  }
  const maxRetries = parseInt(process.env.OPENAI_MAX_RETRIES || '3', 10);
  const timeoutMs = parseInt(process.env.OPENAI_TIMEOUT_MS || '60000', 10);
  let raw = '';
  for (let attempt = 0; attempt < maxRetries; attempt += 1) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort('timeout'), timeoutMs);
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'Append-only: return only novel 1-6 bullets (<=140 chars, start with "- "). Avoid duplicates present in existing list. Exclude noise commits. Do NOT output bullets for any of the following (case-insensitive):\n- merges/syncs from the default branch (e.g., "merge main", "merge branch \'main\'", "sync with main")\n- version/release bumps or tagging (e.g., "bump version", "version bump", "release vX.Y.Z", "chore(release)")\n- lint/format/type/test-only changes (e.g., "lint", "eslint", "prettier", "format", "typing", "mypy", "tests", "fix tests", "snapshots")\n- unreadable low-signal strings (mostly hashes/IDs or gibberish; very short messages without descriptive words)\nIf nothing remains after filtering, return an empty output.' },
            { role: 'user', content: `Branch: ${branch}\nExisting bullets (keep, avoid duplicates):\n${existing}\n\nNew commit messages to summarize:\n${commits}` },
          ],
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!resp.ok) {
        const txt = await resp.text();
        if (resp.status >= 500 && attempt < maxRetries - 1) {
          await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
          continue;
        }
        console.error(`OpenAI error: ${resp.status} ${txt}`);
        process.exit(1);
      }
      const data = await resp.json();
      raw = (data.choices?.[0]?.message?.content || '').trim();
      break;
    } catch (e) {
      if (attempt < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
        continue;
      }
      console.error(String(e));
      process.exit(1);
    }
  }
  const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
  const novel = dedupe(existing, lines);
  process.stdout.write(novel.join('\n'));
}

main().catch((e) => {
  console.error(String(e));
  process.exit(1);
});
