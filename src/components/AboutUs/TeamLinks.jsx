import React from 'react';
import './temlink.css';
const TeamMember = ({ name, github, linkedin, twitter }) => (
  <div className="team-member">
    <h3>{name}</h3>
    <div className="social-links">
      <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href={twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
    </div>
  </div>
);

const TeamLinks = () => {
  const teamMembers = [
    {
      name: "Salah Malih",
      github: "https://github.com/salahmalih",
      linkedin: "https://linkedin.com/in/salah-malih",
      twitter: "https://twitter.com/SAlA7__M"
    },
  ];

  return (
    <div className="team-links">
      <h2>Our Team</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
      <div className="project-link">
        <h3>Project Repository</h3>
        <a href="https://github.com/salahmalih/EasyRecipe-MVP" target="_blank" rel="noopener noreferrer">
          EasyRecipe GitHub Repository
        </a>
      </div>
    </div>
  );
};

export default TeamLinks;