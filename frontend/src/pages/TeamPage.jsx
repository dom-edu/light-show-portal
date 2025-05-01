import React from 'react';
import './TeamPage.css';

const teamMembers = [
  // Row 1
  { id: 1, name: "John Doe", role: "Hardware Engineer", description: "Designed circuit boards and sensor arrays.", image: "" },
  { id: 2, name: "Jane Smith", role: "Software Developer", description: "Built the React frontend and WebSocket integration.", image: "" },
  { id: 3, name: "Alex Johnson", role: "Project Manager", description: "Coordinated sprints and hardware procurement.", image: "" },
  // Row 2
  { id: 4, name: "Maria Garcia", role: "UI/UX Designer", description: "Created interface prototypes and user flows.", image: "" },
  { id: 5, name: "David Kim", role: "Backend Engineer", description: "Developed the Flask API and database architecture.", image: "" },
  { id: 6, name: "Sarah Chen", role: "Testing Engineer", description: "Implemented unit and integration tests.", image: "" },
  // Row 3
  { id: 7, name: "Michael Brown", role: "Documentation", description: "Prepared technical manuals and tutorials.", image: "" },
  { id: 8, name: "Emily Wilson", role: "Hardware Technician", description: "Assembled and calibrated devices.", image: "" },
  { id: 9, name: "Daniel Lee", role: "DevOps", description: "Configured deployment pipelines.", image: "" }
];

const TeamPage = () => {
  return (
    <div className="team-page">
      <div className="container">
        <h1 className="text-center mb-5">Meet the Team</h1>
        
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-member-photo"
                />
              ) : (
                <div className="team-member-photo no-image">
                  {member.name.charAt(0)}
                </div>
              )}
              <h3>{member.name}</h3>
              <span className="role">{member.role}</span>
              <p className="description">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;