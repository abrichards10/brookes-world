import React from "react";
import { Outlet } from "react-router-dom";
import CloudsAnimation from "./CloudsAnimation";
import StarsAnimation from "./StarsAnimation";

const Layout = ({ isDarkMode }) => {
  // Day scene (clouds + sun) in light mode, night scene (stars + moon) in dark
  const showClouds = !isDarkMode;
  const showStars = isDarkMode;

  return (
    <div
      className={isDarkMode ? "dark-mode" : "light-mode"}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        isolation: "isolate",
      }}
    >
      {/* Gradient sky (always present, themed) */}
      <div className="sky" aria-hidden="true" />

      {showClouds && (
        <>
          <div className="day-glow" aria-hidden="true" />
          <div className="sun-glow" aria-hidden="true" />
          <div style={{ opacity: 0.6, transition: "opacity 0.8s ease" }}>
            <CloudsAnimation />
          </div>
        </>
      )}

      {showStars && (
        <>
          <div className="nebula" aria-hidden="true" />
          <div className="nebula-detail" aria-hidden="true" />
          <div className="aurora" aria-hidden="true" />
          <div style={{ opacity: 1, transition: "opacity 0.8s ease" }}>
            <StarsAnimation />
          </div>
        </>
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
