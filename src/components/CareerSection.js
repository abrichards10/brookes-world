import React from "react";
import "./App.css";

const CareerSection = () => {
  return (
    <section id="skills" className="section career-section">
      <div className="section-header">
        <span className="section-eyebrow">How I Work</span>
        <h2 className="section-title">Skills &amp; Craft</h2>
        <p className="section-lead">
          I like owning problems from the database schema all the way to the
          deployed UI — and increasingly, the AI agents in between.
        </p>
      </div>

      <div className="expertise-grid">
        <div className="expertise-card">
          <h3>🎨 Frontend</h3>
          <p>
            React &amp; Vue.js, TypeScript, component libraries &amp; design
            systems, Flutter/Dart, responsive and accessible UI
          </p>
        </div>
        <div className="expertise-card">
          <h3>⚙️ Backend &amp; AI</h3>
          <p>
            Node.js, Python, RESTful APIs, LLM agent workflows, Slack
            integrations, authentication flows
          </p>
        </div>
        <div className="expertise-card">
          <h3>🗄️ Data &amp; Infrastructure</h3>
          <p>
            PostgreSQL, BigQuery, GCP &amp; AWS, Docker, CI/CD, trunk-based
            development, cost optimization
          </p>
        </div>
        <div className="expertise-card">
          <h3>🔐 Identity &amp; Security</h3>
          <p>
            GCIP, Auth0, Okta, Microsoft Entra, SSO (SAML/OIDC), RBAC,
            cross-tenant isolation, pentest hardening
          </p>
        </div>
      </div>

      <h3 className="career-subhead">What I bring to the table</h3>
      <ul>
        <li>
          A track record of owning complex features end-to-end, from schema to
          shipped UI to the agent running behind it
        </li>
        <li>
          Experience mentoring engineers and leading technical initiatives
          across cross-functional teams
        </li>
        <li>
          A bias toward clean, maintainable code and thoughtful system design —
          and toward migrations done safely
        </li>
      </ul>
    </section>
  );
};

export default CareerSection;
