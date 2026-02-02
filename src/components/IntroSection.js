// src/components/IntroSection.js
import React from "react";
import "./App.css";
import brookephoto from "./assets/BrookeLook.jpeg";

const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="intro-content">
        <div className="intro-photo">
          <img
            src={brookephoto}
            alt="Brooke Richards"
          />
        </div>
        <div className="intro-text">
          <div className="role-badge">
            <span>🚀</span>
            <span>Full Stack Developer @ Qurrent</span>
          </div>
          <h2>Hey, I'm Brooke!</h2>
          <p>
            I'm a Full Stack Developer at Qurrent, where I build and maintain enterprise applications 
            that power AI workforce management. My work spans from crafting intuitive Vue.js interfaces 
            to architecting robust backend systems with PostgreSQL, BigQuery, and GCP infrastructure.
          </p>
          <br />
          <p>
            Beyond the code, I'm passionate about teaching and mentoring—whether it's leading 
            HTML/CSS courses at Mission Bit or helping women break back into tech. When I'm not 
            at my desk, you'll find me rock climbing, renovating my childhood home with my dad, 
            or attempting to learn yet another language (currently: Spanish, Italian, and Latin).
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
