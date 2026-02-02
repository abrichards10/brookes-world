// src/components/ThanksMessage.js
import React from "react";
import "./App.css";

const ThanksMessage = () => {
  return (
    <div className="thanks-message">
      <h4>Thanks for stopping by! ✨</h4>
      <p style={{ 
        opacity: 0.7, 
        fontSize: '1rem', 
        marginTop: '0.5rem',
        fontWeight: 400 
      }}>
        Let's build something great together.
      </p>
    </div>
  );
};

export default ThanksMessage;
