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
  { id: 15, name: "Michael Yorke", grade: 11, role: "Frontend Developer" },
  { id: 16, name: "Awal Abass", grade: 11, role: "Member" },
  { id: 17, name: "Shuaeib Abass", grade: 9, role: "Member" },
  { id: 18, name: "Jeffrey Agyeman", grade: 12, role: "Member" },
  { id: 19, name: "Yasnine Belem", grade: 12, role: "Member" },
  { id: 20, name: "Bintou Berthe", grade: 10, role: "Member" },
  { id: 21, name: "Djene Gisse", grade: 10, role: "Member" },
  { id: 22, name: "Hadiatou Diallo", grade: 11, role: "Member" },
  { id: 23, name: "Kadija Diallo", grade: 11, role: "Member" },
  { id: 24, name: "Taye Elleby", grade: 9, role: "Member" },
  { id: 25, name: "Abena Ennin", grade: 11, role: "Member" },
  { id: 26, name: "Justin Gregoire", grade: 10, role: "Member" },
  { id: 27, name: "Amadou Konate", grade: 9, role: "Member" },
  { id: 28, name: "Amara Kone", grade: 11, role: "Member" },
  { id: 29, name: "Kellyson Oliva", grade: 9, role: "Member" },
  { id: 30, name: "Nehemiah Robinson", grade: 11, role: "Member" },
  { id: 31, name: "Fanta SANGARE", grade: 12, role: "Member" },
  { id: 32, name: "Aaliyah Santiago", grade: 9, role: "Member" },
  { id: 33, name: "Sidy Seck", grade: 12, role: "Member" },
  { id: 34, name: "Kamran Stewart", grade: 11, role: "Member" }
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