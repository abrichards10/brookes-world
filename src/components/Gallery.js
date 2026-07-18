import React from "react";
import "./App.css";

import projectImage1 from "./assets/SideProject1.jpg";
import projectImage2 from "./assets/SideProject2.jpg";
import projectImage3 from "./assets/SideProject3.png";
import projectImage4 from "./assets/SideProject4.jpg";
import projectImage5 from "./assets/SideProject5.png";
import projectImage6 from "./assets/SideProject6.jpg";
import belleDancing from "./assets/BelleDancing.jpg";

const projects = [
  {
    image: projectImage5,
    caption: "Teaching",
    summary:
      "Meeting with a group of talented women to break them back into the tech field after a gap year — creating and teaching a rigorous full-stack Python curriculum.",
  },
  {
    image: projectImage1,
    caption: "Home Renovation",
    summary:
      "Renovating my childhood home into an AirBnB (featuring my dad ❤️). I drive 3 hours every 3 weeks to work on the next part of the project.",
  },
  {
    image: projectImage2,
    caption: "Rock Climbing",
    summary:
      "Since December 2022 I've climbed 2–4× per week with my partner to help relieve the pain from my severe scoliosis.",
  },
  {
    image: projectImage3,
    caption: "Learning Spanish",
    summary: "My quest to learn Spanish on Duolingo 🇪🇸 ¡Vamos!",
  },
  {
    image: projectImage4,
    caption: "BEST Trial",
    summary:
      "Completed the BEST Trial for Chronic Back Pain — finished both rounds of treatment! 🎉",
  },
  {
    image: belleDancing,
    caption: "BELLE Dancing",
    summary:
      "Dancing with BELLE — expressing creativity and staying active through movement 💃",
  },
  {
    image: projectImage6,
    caption: "Writing",
    summary: (
      <>
        I like to write things — this one is my longest:{" "}
        <a
          className="inner-link"
          href="https://medium.com/@angelarichards261/pain-b9052e391458"
          target="_blank"
          rel="noopener noreferrer"
        >
          "Pain" (but it's hopeful, I promise)
        </a>
      </>
    ),
  },
];

const Gallery = () => {
  return (
    <section id="projects" className="section projects-section">
      <div className="section-header">
        <span className="section-eyebrow">Beyond the Code</span>
        <h2 className="section-title">Side Projects</h2>
        <p className="section-lead">
          Ooh boy, well… I tend to be one of those people who gets really bored
          with no work to do.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.caption} className="project-card">
            <div className="project-media">
              <img
                src={project.image}
                alt={project.caption}
                className="project-image"
                loading="lazy"
              />
            </div>
            <div className="project-body">
              <h3 className="project-title">{project.caption}</h3>
              <p className="project-summary">{project.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
