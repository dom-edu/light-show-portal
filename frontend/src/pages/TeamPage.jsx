import './TeamPage.css';

const teamMembers = [
  { id: 1, name: "Justin Cadiz", grade: 12, role: "Team Lead" },
  { id: 2, name: "Moussa Cisse", grade: 11, role: "Hardware Specialist" },
  { id: 3, name: "Bakary Diabate", grade: 11, role: "Software Engineer" },
  { id: 4, name: "Ahmadou Diallo", grade: 12, role: "UI Designer" },
  { id: 5, name: "Ayenoumou Diane", grade: 9, role: "Junior Developer" },
  { id: 6, name: "Fallou Diongue", grade: 11, role: "Systems Analyst" },
  { id: 7, name: "Wilkins Edouard", grade: 11, role: "Documentation Lead" },
  { id: 8, name: "Dillon Gregg", grade: 11, role: "Testing Engineer" },
  { id: 9, name: "Makayla Joe", grade: 10, role: "UX Designer" },
  { id: 10, name: "Ismaeel Kassim", grade: 11, role: "Backend Developer" },
  { id: 11, name: "Awa Keita", grade: 12, role: "Project Manager" },
  { id: 12, name: "Mohammed", grade: 11, role: "Hardware Technician" },
  { id: 13, name: "Christian Rose", grade: 12, role: "QA Engineer" },
  { id: 14, name: "Youssouf Toure", grade: 11, role: "DevOps Specialist" },
  { id: 15, name: "Michael Yorke", grade: 11, role: "Frontend Developer" }
];

const TeamPage = () => {
  return (
    <div className="team-page py-5">
      <div className="container">
        <h1 className="text-center mb-5 display-4 fw-bold">Meet The Team</h1>
        
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-member-photo no-image">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3>{member.name}</h3>
              <div className="team-meta">
                <span className="badge bg-primary me-1">Grade {member.grade}</span>
                {member.studentId && (
                  <span className="badge bg-secondary">{member.studentId}</span>
                )}
              </div>
              <p className="role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;