import React, { useEffect, useState } from "react";
import "./App.css";

/*
  Flagship work. To add a project, append an object to this array.
  `impact` is the one-line headline; problem/approach/impactLong power the
  case-study modal that opens when a card is clicked.
*/
const projects = [
  {
    title: "AI Feedback Triage & Slack Bot",
    impact: "Turned scattered product feedback into roadmap tickets — automatically.",
    description:
      "An agentic system that reads feedback from the app and Slack (including files, images, and full thread history), proactively offers to open tickets, links or updates existing issues, and respects each workforce's permissions and channel bindings.",
    tags: ["LLM Agents", "Slack API", "Python"],
    accent: "violet",
    problem:
      "Product feedback arrived everywhere — in-app, buried in Slack threads, attached as files — and turning it into tracked work was manual and easy to drop.",
    approach:
      "Built an agent that reads the full context (thread history, files, images), proposes tickets, links or updates existing ones, and posts back in Slack. It respects each workforce's permissions and channel bindings, works across languages, and is fully instrumented with metrics.",
    impactLong:
      "Feedback becomes roadmap tickets automatically, with humans kept in the loop via confirm/cancel — closing the loop from 'someone mentioned a bug' to 'it's on the board.'",
  },
  {
    title: "Roadmaps: GitHub → Database Migration",
    impact: "Migrated the entire roadmap & kanban system off GitHub Projects.",
    description:
      "Moved roadmaps to a Postgres-backed system with a safe dual-write → backfill → staged feature-flag rollout → cutoff, across dev, prod, and AWS — then removed all legacy GitHub code.",
    tags: ["PostgreSQL", "React", "Migration"],
    accent: "teal",
    problem:
      "Roadmaps lived in GitHub Projects, which capped what the product could do and coupled it to GitHub's model and availability.",
    approach:
      "Migrated to a Postgres-backed system via a safe dual-write → backfill → staged feature-flag rollout → cutoff, across dev/prod/AWS, then removed all legacy GitHub code.",
    impactLong:
      "Custom boards, priorities, labels, filters, assignees, and notifications — all owned in-product, with no GitHub dependency.",
  },
  {
    title: "Auth & Identity Overhaul",
    impact: "Re-platformed authentication and shipped self-service SSO.",
    description:
      "Migrated authentication to Google Cloud Identity Platform and built self-service SSO (SAML + OIDC) for Okta and Microsoft Entra, hardened with RBAC, cross-tenant isolation, and audit logging.",
    tags: ["GCIP", "Okta", "Entra", "Security"],
    accent: "amber",
    problem:
      "Authentication was tied to Auth0, and enterprise customers needed self-service SSO with strict tenant isolation.",
    approach:
      "Migrated to Google Cloud Identity Platform and built self-service SSO (SAML + OIDC) for Okta and Microsoft Entra, with RBAC, audit logging, and cross-tenant isolation — validated by pentest hardening.",
    impactLong:
      "Customers configure their own SSO; the platform enforces least-privilege access and keeps tenants isolated.",
  },
  {
    title: "BigQuery Cost Optimization",
    impact: "Diagnosed and cut runaway analytics spend.",
    description:
      "Traced escalating Datastream merge costs to full-table scans, then introduced partitioning, clustering, and a batch-staging strategy — plus cost-monitoring queries.",
    tags: ["BigQuery", "GCP", "Data Eng"],
    accent: "rose",
    problem:
      "Analytics costs were climbing as Datastream merges repeatedly scanned full tables on every update.",
    approach:
      "Traced the cost to full-table scans, then introduced partitioning, clustering, and a batch-staging strategy, plus cost-monitoring queries so spend stays visible.",
    impactLong:
      "Spend became visible and predictable instead of quietly growing in the background.",
  },
  {
    title: "SRE / Investigator Agent",
    impact: "An agent that reads the logs so engineers don't have to.",
    description:
      "Ingests error logs, deep-dives across logs, traces, and the codebase, and reports its findings back to engineers — abstracted into a reusable Investigator workflow.",
    tags: ["Observability", "LLM Agents"],
    accent: "sky",
    problem:
      "Diagnosing incidents meant an engineer manually piecing together logs, traces, and code under time pressure.",
    approach:
      "Built an agent that ingests an error, deep-dives across logs / traces / the codebase, and reports its findings — then abstracted it into a reusable Investigator workflow.",
    impactLong:
      "Point it at an incident and it does the first pass of the investigation, so engineers start from findings instead of a blank page.",
  },
];

const SelectedWork = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="work" className="section work-section">
      <div className="section-header">
        <span className="section-eyebrow">What I've Built</span>
        <h2 className="section-title">Selected Work</h2>
        <p className="section-lead">
          A few things I've owned end-to-end at Qurrent — from AI agents to data
          infrastructure to the platform that ties it together.{" "}
          <span className="section-lead-hint">Click a card for the story.</span>
        </p>
      </div>

      <div className="work-grid">
        {projects.map((project) => (
          <button
            key={project.title}
            className={`work-card accent-${project.accent}`}
            onClick={() => setSelected(project)}
            aria-label={`${project.title} — read the case study`}
          >
            <div className="work-card-spine" aria-hidden="true" />
            <div className="work-card-body">
              <p className="work-card-impact">{project.impact}</p>
              <h3 className="work-card-title">{project.title}</h3>
              <p className="work-card-desc">{project.description}</p>
              <div className="work-card-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="work-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="work-card-more">Read case study →</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="case-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} case study`}
          onClick={() => setSelected(null)}
        >
          <div
            className={`case-card accent-${selected.accent}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="case-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <p className="case-impact">{selected.impact}</p>
            <h3 className="case-title">{selected.title}</h3>
            <div className="work-card-tags case-tags">
              {selected.tags.map((tag) => (
                <span key={tag} className="work-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="case-section">
              <h4>The problem</h4>
              <p>{selected.problem}</p>
            </div>
            <div className="case-section">
              <h4>What I did</h4>
              <p>{selected.approach}</p>
            </div>
            <div className="case-section">
              <h4>The impact</h4>
              <p>{selected.impactLong}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedWork;
