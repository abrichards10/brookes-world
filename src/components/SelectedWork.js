import React, { useEffect, useState } from "react";
import "./App.css";

/*
  Resume-style competency areas — what I work on, in broad strokes.
  `detail` is the slightly longer version shown in the modal.
*/
const areas = [
  {
    title: "AI Agents & Automation",
    impact: "I build the AI agents that live inside the product.",
    description:
      "LLM-powered agents that read context, make decisions, and take action — turning everyday operations into something that mostly runs itself, with people kept in the loop where it counts.",
    tags: ["LLM Agents", "Python", "Slack API"],
    accent: "violet",
    detail:
      "A lot of my recent work is building agents that work alongside people — reading conversations and context, deciding what actually matters, and taking the next step on their own. It spans routing and triage to automated investigation, always with a human in the loop where the stakes are high.",
  },
  {
    title: "Full-Stack Product Engineering",
    impact: "I own features end-to-end, from schema to shipped UI.",
    description:
      "Building and maintaining an enterprise platform across the whole stack — React and Vue on the front end, Node and Python services behind it — and taking features all the way from idea to polished UI.",
    tags: ["React", "Vue", "Node.js", "Python"],
    accent: "teal",
    detail:
      "I'm comfortable anywhere in the stack and like owning features end to end: the interface, the services behind it, and the data underneath. I care a lot about the last mile — the details that make software feel considered and reliable.",
  },
  {
    title: "Identity & Access",
    impact: "I design how enterprises sign in — securely.",
    description:
      "The authentication and access layer for enterprise customers: single sign-on, role-based permissions, and strict separation between tenants, with security treated as a first-class requirement.",
    tags: ["SSO", "Okta", "Microsoft Entra", "RBAC"],
    accent: "amber",
    detail:
      "I work on how organizations sign in and what they're allowed to touch — self-service SSO, fine-grained roles, and keeping every customer's data cleanly isolated. It's the kind of work where 'mostly right' isn't good enough, so the details get real attention.",
  },
  {
    title: "Data & Cloud Infrastructure",
    impact: "I keep the data and infra layer fast and sane.",
    description:
      "Working across databases, analytics, and cloud — PostgreSQL and BigQuery, GCP and AWS, pipelines and deployments — with an eye on performance, reliability, and cost.",
    tags: ["PostgreSQL", "BigQuery", "GCP", "AWS"],
    accent: "sky",
    detail:
      "I spend a lot of time in the data and infrastructure layer, keeping things fast, reliable, and cost-aware as they scale — from schema and query design to the pipelines and deployments that keep everything running.",
  },
  {
    title: "Platform & Craft",
    impact: "I sweat the craft of the product itself.",
    description:
      "How the product is built, not just what it does — a shared component library and design system, thoughtful tooling, and the small details that make everything feel cohesive.",
    tags: ["Design Systems", "Tooling", "DX"],
    accent: "rose",
    detail:
      "Beyond features, I invest in the things that make a product feel considered: a consistent component library and design system, tooling that makes the team faster, and the small, easy-to-skip details that add up to a polished experience.",
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
        <span className="section-eyebrow">What I Do</span>
        <h2 className="section-title">Selected Work</h2>
        <p className="section-lead">
          The main areas I work in at Qurrent, in broad strokes.{" "}
          <span className="section-lead-hint">Click a card for a bit more.</span>
        </p>
      </div>

      <div className="work-grid">
        {areas.map((area) => (
          <button
            key={area.title}
            className={`work-card accent-${area.accent}`}
            onClick={() => setSelected(area)}
            aria-label={`${area.title} — read more`}
          >
            <div className="work-card-spine" aria-hidden="true" />
            <div className="work-card-body">
              <p className="work-card-impact">{area.impact}</p>
              <h3 className="work-card-title">{area.title}</h3>
              <p className="work-card-desc">{area.description}</p>
              <div className="work-card-tags">
                {area.tags.map((tag) => (
                  <span key={tag} className="work-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="work-card-more">Read more →</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="case-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
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
            <p className="case-detail">{selected.detail}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedWork;
