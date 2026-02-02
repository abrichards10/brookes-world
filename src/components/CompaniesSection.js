import React from "react";
import "./App.css";
import dishlogo from "./assets/DishcoveryLogo.png";
import missionlogo from "./assets/MissionBitLogo.png";
import seologo from "./assets/seo-logo.png";
import anteneh from "./assets/Anteneh.jpg";
import rachel from "./assets/rachel.jpg";
import brooke from "./assets/it_crowd_icon.png";

const companies = [
  {
    name: "Qurrent",
    logo: null,
    website: "https://www.qurrent.ai",
    role: {
      title: "Full Stack Developer",
      text: "Building and maintaining the Supervisor application—an enterprise platform for AI workforce management. Responsible for Vue.js frontend, PostgreSQL databases, GCP infrastructure, and identity integrations (Auth0, Okta, Microsoft Entra).",
    },
    testimonial: {
      name: "Brooke Richards",
      title: "A Note From Me",
      text: '"My journey through startups and teaching has shaped who I am as an engineer. At Dishcovery, I learned the value of ownership, teamwork, and building what people actually need. Now at Qurrent, I get to apply those lessons at scale while continuing to grow."',
      picture: brooke,
    },
    isCurrent: true,
  },
  {
    name: "Dishcovery",
    logo: dishlogo,
    website: "https://www.dishcovery.io",
    role: {
      title: "Lead Front-End Engineer",
      text: "Led front-end development and mentored the engineering team. Drove product development, organized hackathons, and optimized code deployment workflows.",
    },
    testimonial: {
      name: "Brooke Richards",
      title: "Reflecting on Dishcovery",
      text: '"My experience at Dishcovery taught me the innate value of ownership, consistency, teamwork and leadership. I learned how to learn fast and how to put all of your energy into building what people want rather than just what seems cool."',
      picture: brooke,
    },
  },
  {
    name: "Mission Bit",
    logo: missionlogo,
    website: "https://www.missionbit.org",
    role: {
      title: "HTML/CSS/UI/UX Instructor",
      text: "Led HTML/CSS/UI/UX classes for high school students, creating engaging curriculum and inspiring the next generation of developers.",
    },
    testimonial: {
      name: "Rachel Scales",
      title: "Innovative Learning Manager @ Mission Bit",
      text: "\"I've had the privilege of working with Brooke for over a year. She is an extraordinary educator who cultivates a lively, collaborative learning environment. A former student remarked that they never really enjoyed school but always looked forward to her class. Beyond the classroom, Brooke is a dedicated leader and mentor.\"",
      picture: rachel,
    },
  },
  {
    name: "SEO",
    logo: seologo,
    website: "https://www.seo-usa.org",
    role: {
      title: "Software Engineering TA & Career Mentor",
      text: "Served as a Software Engineering Teaching Assistant, providing guidance on Python, SQL, and career development through workshops and office hours.",
    },
    testimonial: {
      name: "Anteneh Zewdie",
      title: "SWE Intern @ Prevent Overdose Inc.",
      text: '"I had the privilege of being mentored by Brooke during my technical interview preparation at SEO. Her expertise as a Software Engineer and Career Mentor was evident from the first session, and her mentorship has been instrumental in my growth."',
      picture: anteneh,
    },
  },
];

const CompaniesSection = () => {
  return (
    <section className="companies-section">
      <h2 className="Companiestext">Experience & Impact</h2>
      <div className="companies-list">
        {companies.map((company, index) => (
          <div 
            key={index} 
            className={`company-card ${company.isCurrent ? 'no-flip' : ''}`}
          >
            <div className="card-front">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="company-logo"
                />
              ) : (
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '600', 
                  fontFamily: 'var(--font-display)',
                  marginBottom: 'var(--space-md)',
                  letterSpacing: '-0.02em'
                }}>
                  {company.name}
                </div>
              )}
              {company.isCurrent && (
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: 'rgba(76, 175, 80, 0.15)',
                  color: '#4CAF50',
                  marginBottom: 'var(--space-md)',
                }}>
                  Current Role
                </span>
              )}
              <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                {company.role.title}
              </p>
              <p>{company.role.text}</p>
            </div>
            <div className="card-back">
              <img
                src={company.testimonial.picture}
                alt={company.testimonial.name}
                className="testimonial-image"
              />
              <h6 className="testName">{company.testimonial.name}</h6>
              <h6 className="testimonial-title">
                {company.testimonial.title}
              </h6>
              <i>
                <p className="testimonial-text">
                  {company.testimonial.text}
                </p>
              </i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompaniesSection;
