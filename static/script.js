const teamInfo = [
    {
        name: "Luigi",
        role: "Electronics",
        grade: 10,
        hobbies: ["Soccer", "Playing the trumpet", "Video Games"]
    },
    {
        name: "John Cena",
        role: "3D modeling",
        grade: 11,
        hobbies: ["Soccer", "Playing the trumpet", "Video Games"]
    },
    {
        name: "Bianca Belair",
        role: "Coder",
        grade: 12,
        hobbies: ["Soccer", "Playing the trumpet", "Video Games"]
    },
    {
        name: "Mario",
        role: "Electronics",
        grade: 10,
        hobbies: ["Soccer", "Playing the trumpet", "Video Games"]
    }
]

// Render each member in the list
const container = document.getElementById("team-container");

function displayTeam() {
    teamInfo.forEach(member => {
        const col = document.createElement("div");
        col.classList.add("col-md-3", "text-center");

        const img = document.createElement("img");
        img.src = member.image;
        img.classList.add("img-fluid", "rounded-circle", "mb-2");
        img.alt = `${member.name}'s photo`;

        const name = document.createElement("h3");
        name.textContent = member.name;

        const role = document.createElement("h4");
        role.classList.add("text-muted");
        role.textContent = member.role;

        const bio = document.createElement("p");
        bio.textContent = `Grade: ${member.grade} | Hobbies: ${member.hobbies.join(", ")}`;

        col.appendChild(img);
        col.appendChild(name);
        col.appendChild(role);
        col.appendChild(bio);
        container.appendChild(col);
    });
}

displayTeam();