import React from "react";
import "./App.css";

const CareerSection = () => {
  return (
    <section className="career-section">
      <div className="career-content">
        <h2>What I Do at Qurrent:</h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.85 }}>
          I build, maintain, and oversee the Supervisor application—an enterprise platform that enables 
          users to manage AI workforces, workflows, and agent instances at scale.
        </p>
        <ul>
          <li>
            <strong>Full Stack Development:</strong> Building responsive interfaces in Vue.js paired with 
            robust backend services, database architecture, and API integrations
          </li>
          <li>
            <strong>Infrastructure & DevOps:</strong> Configuring GCP logging, BigQuery analytics pipelines, 
            and managing lifecycle deployments across environments
          </li>
          <li>
            <strong>Identity & Access:</strong> Implementing Auth0, Okta, and Microsoft Entra integrations 
            with sophisticated role-based access control systems
          </li>
          <li>
            <strong>Database Engineering:</strong> PostgreSQL instance configuration, schema design, 
            maintenance procedures, and performance optimization
          </li>
        </ul>

        <h2>Technical Expertise</h2>
        <div className="expertise-grid">
          <div className="expertise-card">
            <h3>🎨 Frontend</h3>
            <p>Vue.js, React, TypeScript, Flutter/Dart, responsive design, component architecture</p>
          </div>
          <div className="expertise-card">
            <h3>⚙️ Backend</h3>
            <p>Node.js, Python, RESTful APIs, authentication flows, microservices patterns</p>
          </div>
          <div className="expertise-card">
            <h3>🗄️ Data & Infrastructure</h3>
            <p>PostgreSQL, BigQuery, GCP, Docker, CI/CD pipelines, trunk-based development</p>
          </div>
          <div className="expertise-card">
            <h3>🔐 Identity & Security</h3>
            <p>Auth0, Okta, Microsoft Entra, RBAC implementation, SSO configuration</p>
          </div>
        </div>

        <h2 style={{ marginTop: '2rem' }}>What I Bring to the Table</h2>
        <ul>
          <li>
            Proven track record of owning complex features end-to-end, from database schema to deployed UI
          </li>
          <li>
            Experience mentoring engineers and leading technical initiatives across cross-functional teams
          </li>
          <li>
            Strong foundation in mobile development (iOS/Android) with Flutter and native tooling
          </li>
          <li>
            Passion for clean, maintainable code and thoughtful system design
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CareerSection;

