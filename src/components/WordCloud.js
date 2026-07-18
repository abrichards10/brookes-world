import React, { useEffect } from "react";
import TagCloud from "TagCloud";

const container = ".content";
const texts = [
  // Frontend
  "React",
  "Vue.js",
  "TypeScript",
  "JavaScript",
  "Flutter",
  "Dart",
  "HTML",
  "CSS",
  // Backend & Languages
  "Node.js",
  "Python",
  "REST APIs",
  "LLM Agents",
  // Databases & Data
  "PostgreSQL",
  "BigQuery",
  "Firestore",
  // Cloud & DevOps
  "GCP",
  "AWS",
  "Docker",
  "CI/CD",
  // Identity & Auth
  "GCIP",
  "Auth0",
  "Okta",
  "Microsoft Entra",
  "SSO",
  "RBAC",
  // Mobile
  "iOS",
  "Android",
  // Tools
  "Git",
  "Slack API",
  "PostHog",
];

const options = {
  radius: 220,
  maxSpeed: "normal",
  initSpeed: "slow",
  direction: 135,
  keep: true,
  useContainerInlineStyle: true,
};

const WordCloud = () => {
  useEffect(() => {
    const tagCloudInstance = TagCloud(container, texts, options);

    return () => {
      if (tagCloudInstance && typeof tagCloudInstance.destroy === "function") {
        tagCloudInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="word-cloud">
      <span className="content"></span>
    </div>
  );
};

export default WordCloud;
