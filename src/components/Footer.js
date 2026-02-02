import React from "react";
import { FaLinkedin, FaGithub, FaCalendarAlt, FaHeart } from "react-icons/fa";
import "./App.css";

const Footer = ({ darkMode }) => {
  return (
    <footer className={`footer ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="footer-content">
        <div className="footer-main-content">
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/brooke-richards-swe/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com/abrichards10"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <div className="dateCreated">
              <FaCalendarAlt size={16} style={{ marginRight: "8px" }} />
              <span>Est. August 2024</span>
            </div>
          </div>
          <div className="contact-info">
            <p>
              <a href="mailto:angelarichards261@gmail.com">
                angelarichards261@gmail.com
              </a>
            </p>
          </div>
          <div className="copyright">
            <p>
              Built with <FaHeart size={12} style={{ verticalAlign: 'middle', margin: '0 4px' }} /> by Brooke Richards
              {" · "}&copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
        <div className="footer-websites">
          <b>Cool Finds:</b>
          <ul>
            <li>
              <a
                href="http://typelit.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="links">
                  <u>Typelit</u> → Practice typing books
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://websim.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="links">
                  <u>Websim.ai</u> → AI website generator
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://excalidraw.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="links">
                  <u>Excalidraw</u> → Sketch diagrams
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
