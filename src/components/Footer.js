import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
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
              <FaLinkedin size={16} />
            </a>
            <a
              href="https://github.com/abrichards10"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <span className="dateCreated">Est. 2024</span>
          </div>
          <div className="contact-info">
            <a href="mailto:angelarichards261@gmail.com">
              angelarichards261@gmail.com
            </a>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Brooke Richards</p>
          </div>
        </div>
        <div className="footer-websites">
          <b>Cool Finds</b>
          <ul>
            <li>
              <a
                href="http://typelit.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                Typelit
              </a>
            </li>
            <li>
              <a
                href="https://websim.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                Websim.ai
              </a>
            </li>
            <li>
              <a
                href="https://excalidraw.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="links"
              >
                Excalidraw
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
