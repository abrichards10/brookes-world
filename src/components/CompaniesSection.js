import React from "react";
import "./App.css";
import dishlogo from "./assets/DishcoveryLogo.png";
import missionlogo from "./assets/MissionBitLogo.png";
import seologo from "./assets/seo-logo.png";
import anteneh from "./assets/Anteneh.jpg";
import rachel from "./assets/rachel.jpg";

const companies = [
  {
    name: "Qurrent",
    website: "https://www.qurrent.ai",
    period: "Present",
    role: {
      title: "Full Stack Developer",
      text: "Building and maintaining the Supervisor platform for AI workforce management — React & Vue.js front ends, Node.js/Python services, PostgreSQL & BigQuery data, GCP/AWS infrastructure, and identity (GCIP, Okta, Microsoft Entra). Increasingly, I build the AI agents that run inside the product itself.",
    },
    isCurrent: true,
  },
  {
    name: "Dishcovery",
    logo: dishlogo,
    website: "https://www.dishcovery.io",
    period: "Earlier",
    role: {
      title: "Lead Front-End Engineer",
      text: "Led front-end development and mentored the engineering team. Drove product development, organized hackathons, and optimized code deployment workflows.",
    },
    testimonial: {
      name: "Brooke Richards",
      title: "Reflecting on Dishcovery",
      text: "My experience at Dishcovery taught me the innate value of ownership, consistency, teamwork and leadership. I learned how to learn fast and how to put all of your energy into building what people want rather than just what seems cool.",
    },
  },
  {
    name: "Mission Bit",
    logo: missionlogo,
    website: "https://www.missionbit.org",
    period: "Earlier",
    role: {
      title: "HTML/CSS/UI/UX Instructor",
      text: "Led HTML/CSS/UI/UX classes for high school students, creating engaging curriculum and inspiring the next generation of developers.",
    },
    testimonial: {
      name: "Rachel Scales",
      title: "Innovative Learning Manager @ Mission Bit",
      text: "I've had the privilege of working with Brooke for over a year. She is an extraordinary educator who cultivates a lively, collaborative learning environment. A former student remarked that they never really enjoyed school but always looked forward to her class. Beyond the classroom, Brooke is a dedicated leader and mentor.",
      picture: rachel,
    },
  },
  {
    name: "SEO",
    logo: seologo,
    website: "https://www.seo-usa.org",
    period: "Earlier",
    role: {
      title: "Software Engineering TA & Career Mentor",
      text: "Served as a Software Engineering Teaching Assistant, providing guidance on Python, SQL, and career development through workshops and office hours.",
    },
    testimonial: {
      name: "Anteneh Zewdie",
      title: "SWE Intern @ Prevent Overdose Inc.",
      text: "I had the privilege of being mentored by Brooke during my technical interview preparation at SEO. Her expertise as a Software Engineer and Career Mentor was evident from the first session, and her mentorship has been instrumental in my growth.",
      picture: anteneh,
    },
  },
];

const CompaniesSection = () => {
  return (
    <section id="experience" className="section companies-section">
      <div className="section-header">
        <span className="section-eyebrow">Where I've Been</span>
        <h2 className="section-title">Experience &amp; Impact</h2>
      </div>

      <div className="timeline">
        {companies.map((company) => (
          <div key={company.name} className="timeline-item">
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content">
              <div className="timeline-head">
                <div>
                  <h3 className="timeline-role">{company.role.title}</h3>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="timeline-company"
                  >
                    {company.name}
                  </a>
                </div>
                {company.isCurrent ? (
                  <span className="timeline-badge current">Current</span>
                ) : (
                  <span className="timeline-period">{company.period}</span>
                )}
              </div>
              <p className="timeline-text">{company.role.text}</p>

              {company.testimonial && (
                <figure className="timeline-quote">
                  {company.testimonial.picture && (
                    <img
                      src={company.testimonial.picture}
                      alt={company.testimonial.name}
                      className="quote-avatar"
                    />
                  )}
                  <div>
                    <blockquote>"{company.testimonial.text}"</blockquote>
                    <figcaption>
                      <strong>{company.testimonial.name}</strong>
                      <span>{company.testimonial.title}</span>
                    </figcaption>
                  </div>
                </figure>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompaniesSection;
