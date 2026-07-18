// Header.js
import React from "react";
import { FaMoon, FaSun, FaRegCommentAlt } from "react-icons/fa";
import logo from "./assets/ghibliIcon.png";
import "./App.css";
import { Link } from "react-router-dom";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className={`header ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header-content">
        <h4 className="header-text">Brooke Richards</h4>
        <div className="logo-container">
          <a
            href="https://www.youtube.com/watch?v=t5khm-VjEu4"
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
            aria-label="Watch the new Studio Ghibli movie trailer"
          >
            <img src={logo} alt="Studio Ghibli" className="header-logo" />
            <span className="text-bubble">
              Psst... Have you seen the new Studio Ghibli movie?
            </span>
          </a>
        </div>
      </div>

      <div className="icon-container">
        <button
          className="theme-toggle"
          onClick={(e) => toggleDarkMode(e)}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className={`theme-icon ${isDarkMode ? "is-dark" : "is-light"}`}>
            <FaMoon className="icon-moon" />
            <FaSun className="icon-sun" />
          </span>
        </button>
        <Link
          to="/feedback"
          className="feedback-icon"
          title="Leave feedback"
          aria-label="Leave feedback"
        >
          <FaRegCommentAlt />
        </Link>
      </div>
    </header>
  );
};

export default Header;
