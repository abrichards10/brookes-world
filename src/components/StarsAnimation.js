import React, { useEffect, useRef } from "react";
import "./App.css";

const StarsAnimation = () => {
  const containerRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;

    const starsContainer = containerRef.current;
    const numStars = 200;

    // Generate stars with twinkling
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star twinkle";
      
      const size = Math.random() * 3 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
      star.style.opacity = Math.random() * 0.6 + 0.4;
      star.style.transform = 'scale(1)';
      
      // Slightly slower twinkle: 2-5s instead of 1-3s
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.animationDelay = `${Math.random() * 4}s`;

      starsContainer.appendChild(star);
    }

    // Add shooting stars - spread across entire screen, but less frequent
    for (let i = 0; i < 3; i++) {
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 70; // Full top 70%
      const left = Math.random() * 100; // Full width
      const duration = Math.random() * 2 + 1.5;

      shootingStar.style.width = `${size}px`;
      shootingStar.style.height = `${size}px`;
      shootingStar.style.top = `${top}%`;
      shootingStar.style.left = `${left}%`;
      shootingStar.style.animation = `shoot ${duration}s linear infinite`;
      // Longer delays between shooting stars (every 8-15 seconds)
      shootingStar.style.animationDelay = `${i * 8 + Math.random() * 5}s`;

      starsContainer.appendChild(shootingStar);
    }

    return () => {
      if (starsContainer) {
        starsContainer.innerHTML = "";
      }
      initialized.current = false;
    };
  }, []);

  return (
    <div ref={containerRef} className="stars-container show-stars"></div>
  );
};

export default StarsAnimation;
