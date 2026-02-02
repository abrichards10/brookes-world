// src/components/CloudsAnimation.js

import React from "react";
import "./App.css";

const Cloud = ({ size, speed, top }) => {
  // Different actual sizes instead of scale (since animation uses transform)
  const sizeMultiplier = size === 'large' ? 1.8 : size === 'small' ? 0.5 : 1;
  const baseWidth = 150;
  const baseHeight = 100;
  const circleBase = 70;
  
  const width = baseWidth * sizeMultiplier;
  const height = baseHeight * sizeMultiplier;
  const circleSize = circleBase * sizeMultiplier;
  
  const duration = speed === 'fast' ? 80 : speed === 'slow' ? 220 : 150;
  const opacity = size === 'large' ? 0.12 : size === 'small' ? 0.2 : 0.15;
  
  return (
    <div 
      className="cloud" 
      style={{ 
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}%`,
        animationDuration: `${duration}s`,
        opacity: opacity,
      }}
    >
      <div className="circle" style={{ 
        width: `${circleSize}px`, 
        height: `${circleSize}px`, 
        top: `${15 * sizeMultiplier}px`, 
        left: 0 
      }}></div>
      <div className="circle" style={{ 
        width: `${circleSize}px`, 
        height: `${circleSize}px`, 
        top: 0, 
        left: `${30 * sizeMultiplier}px` 
      }}></div>
      <div className="circle" style={{ 
        width: `${circleSize}px`, 
        height: `${circleSize}px`, 
        top: `${15 * sizeMultiplier}px`, 
        left: `${60 * sizeMultiplier}px` 
      }}></div>
      <div className="circle" style={{ 
        width: `${circleSize}px`, 
        height: `${circleSize}px`, 
        top: 0, 
        left: `${60 * sizeMultiplier}px` 
      }}></div>
      <div className="circle" style={{ 
        width: `${circleSize}px`, 
        height: `${circleSize}px`, 
        top: `${10 * sizeMultiplier}px`, 
        left: `${100 * sizeMultiplier}px` 
      }}></div>
    </div>
  );
};

const CloudsAnimation = () => {
  // Define clouds with different sizes and speeds
  const clouds = [
    { size: 'large', speed: 'slow', top: 5 },
    { size: 'small', speed: 'fast', top: 12 },
    { size: 'medium', speed: 'normal', top: 22 },
    { size: 'small', speed: 'slow', top: 32 },
    { size: 'large', speed: 'normal', top: 42 },
    { size: 'medium', speed: 'fast', top: 52 },
    { size: 'small', speed: 'normal', top: 62 },
    { size: 'large', speed: 'fast', top: 72 },
    { size: 'medium', speed: 'slow', top: 82 },
    { size: 'small', speed: 'fast', top: 18 },
    { size: 'medium', speed: 'slow', top: 38 },
    { size: 'large', speed: 'normal', top: 58 },
  ];

  return (
    <div className="clouds-container">
      {clouds.map((cloud, index) => (
        <Cloud 
          key={index} 
          size={cloud.size} 
          speed={cloud.speed} 
          top={cloud.top}
        />
      ))}
    </div>
  );
};

export default CloudsAnimation;
