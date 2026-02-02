import React, { useEffect } from "react";
import TagCloud from "TagCloud";

const container = ".content";
const texts = [
  // Frontend
  "Vue.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Flutter",
  "Dart",
  "HTML",
  "CSS",
  "Bootstrap",
  // Backend & Languages
  "Node.js",
  "Python",
  "Java",
  "C#",
  "Objective-C",
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
  "Auth0",
  "Okta",
  "Microsoft Entra",
  "RBAC",
  // Mobile
  "iOS Development",
  "Android Development",
  "XCode",
  // Tools
  "Git",
  "Postman",
  "Jupyter Notebook",
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
