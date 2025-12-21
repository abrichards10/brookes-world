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
    name: "Dishcovery",
    logo: dishlogo,
    website: "https://www.dishcovery.io",
    testimonial: {
      title: "Lead Front-End Engineer",
      text: "As a lead front-end engineer at Dishcovery, I mentored the team and drove product development. My contributions were highly valued, particularly in leading hackathons and optimizing code deployment.",
      picture: dishlogo,
    },
  },
  {
    name: "Mission Bit",
    logo: missionlogo,
    website: "https://www.missionbit.org",
    testimonial: {
      title: "HTML/CSS/UI/UX Instructor",
      text: "At Mission Bit, I led HTML/CSS/UI/UX classes for high school students, inspiring them with engaging projects and guiding them through their coding journey.",
      picture: missionlogo,
    },
  },
  {
    name: "SEO (Sponsors for Educational Opportunity)",
    logo: seologo,
    website: "https://www.seo-usa.org",
    testimonial: {
      title: "Software Engineering Teaching Assistant",
      text: "At SEO, I served as a Software Engineering Teaching Assistant and Career Mentor, providing guidance on Python, SQL, and career development. I facilitated workshops and office hours, supporting students in their journey to become successful developers.",
      picture: seologo,
    },
  },
];

const person = [
  {
    name: "Brooke Richards",
    testimonial: {
      title: "Builder of this Website",
      text: '"My experience at Dishcovery taught me more than I could ever hope for. I was working with a small team relying heavily on one another to succeed. I was taught the innate value of ownership, consistency, teamwork and leadership.  I was also taught the importance of automation, how to learn fast and how to put all of your energy into building what people want rather than just what seems cool.  In the future, I would like to expand on my experience I had at this company, and join another brilliant, crazy team to continue experimenting with."',
      picture: brooke,
    },
  },
  {
    name: "Rachel Scales",
    testimonial: {
      title: "Innovative Learning Manager",
      text: "\"I've had the privilege of working with Brooke for over a year, and I can confidently say that she is an extraordinary educator. She cultivates a lively, collaborative learning environment and skillfully differentiates her teaching so all students can thrive. A former student of Brookes once remarked that they never really enjoyed school but always looked forward to her class. She is adept at engaging students in both in-person and remote settings. It's not just her teaching skills that impress me. Beyond the classroom, Brooke is a dedicated and thoughtful leader, providing invaluable mentorship to colleagues.\"",
      picture: rachel,
    },
  },
  {
    name: "Anteneh Zewdie",
    testimonial: {
      title: "SWE Intern @ Prevent Overdose Inc. ",
      text: '"I had the distinct privilege of being mentored by Brooke during my technical interview preparation at Sponsors for Educational Opportunities. Brooke’s expertise as a Software Engineer and Career Mentor was evident from the very first session, and her mentorship has been instrumental in my growth and readiness for my career."',
      picture: anteneh,
    },
  },
];

const CompaniesSection = () => {
  return (
    <section className="companies-section">
      <h2 className="Companiestext">Companies I've Committed To</h2>
      <div className="companies-list">
        {companies.map((company, index) => (
          <div key={index} className="company-card">
            <div className="card-front">
              <img
                src={company.logo}
                alt={company.name}
                className="company-logo"
              />
              <p>{company.testimonial.text}</p>
            </div>
            <div className="card-back">
              <img
                src={person[index]?.testimonial.picture}
                alt={person[index]?.name}
                className="testimonial-image"
              />
              <h6 className="testName">{person[index]?.name}</h6>
              <h6 className="testimonial-title">
                {person[index]?.testimonial.title}
              </h6>
              <i>
                <p className="testimonial-text">
                  {person[index]?.testimonial.text}
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
