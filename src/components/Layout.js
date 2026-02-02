import React from "react";
import { Outlet } from "react-router-dom";
import CloudsAnimation from "./CloudsAnimation";
import StarsAnimation from "./StarsAnimation";

const Layout = ({ isDarkMode, backgroundColor }) => {
  // Show clouds in light mode, stars in dark mode
  const showClouds = !isDarkMode;
  const showStars = isDarkMode;

  return (
    <div
      className={isDarkMode ? "dark-mode" : "light-mode"}
      style={{ 
        position: "relative", 
        overflow: "hidden",
        backgroundColor: backgroundColor,
        minHeight: "100vh"
      }}
    >
      {showClouds && (
        <div style={{ opacity: 0.6, transition: 'opacity 0.8s ease' }}>
          <CloudsAnimation />
        </div>
      )}
      {showStars && (
        <div style={{ opacity: 1, transition: 'opacity 0.8s ease' }}>
          <StarsAnimation />
        </div>
      )}
      <div className="full-container">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
