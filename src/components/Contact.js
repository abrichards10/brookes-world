import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./App.css";

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-header">
        <span className="section-eyebrow">Say Hello</span>
        <h2 className="section-title">Let's build something great.</h2>
        <p className="section-lead">
          Always happy to talk shop — engineering, teaching, or the next good
          book. The fastest way to reach me is email.
        </p>
      </div>

      <div className="contact-actions">
        <a className="contact-primary" href="mailto:angelarichards261@gmail.com">
          <FaEnvelope /> angelarichards261@gmail.com
        </a>
        <div className="contact-secondary">
          <a
            href="https://www.linkedin.com/in/brooke-richards-swe/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-chip"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="https://github.com/abrichards10"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-chip"
          >
            <FaGithub /> GitHub
          </a>
          <Link to="/feedback" className="contact-chip">
            <FaRegCommentAlt /> Leave feedback
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
