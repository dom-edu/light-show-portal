const teamInfo = [
    {
        name: "Luigi",
        role: "Electronics",
        grade: 10,
        hobbies: ["Soccer", "Playing the trumpet", "Video Games"],
        image: "static/images/pixel-art/art1.png"
    },
    {
        name: "John Cena",
        role: "3D modeling",
        grade: 11,
        hobbies: ["Soccer", "Playing the trumpet", "Video Games"],
        image: "static/images/pixel-art/art2.png"
    },
    {
        name: "Bianca Belair",
        role: "Coder",
        grade: 12,
        hobbies: ["Soccer", "Playing the trumpet", "Video Games"],
        image: "static/images/pixel-art/art3.png"
    },
    {
        name: "Mario",
        role: "Electronics",
        grade: 10,
        hobbies: ["Soccer", "Playing the trumpet", "Video Games"],
        image: "static/images/pixel-art/art4.png"
    }
]

// Render each member in the list
const container = document.getElementById("team-container");
const dButton = document.getElementById("d-button")
function displayTeam() {
    teamInfo.forEach(member => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-sm-6", "col-md-3", "text-center", "mb-4");
        
        // Card container
        const card = document.createElement("div");
        card.classList.add("team-member-card", "p-3");
        
        // Image container div
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container"); // This applies your colored border
        
        const img = document.createElement("img");
        img.src = member.image;
        img.classList.add("img-fluid", "w-100", "h-100"); // Fill the container
        img.alt = `${member.name}'s photo`;
        img.style.objectFit = "cover"; // Ensure proper image scaling
        
        // Append image to its container
        imgContainer.appendChild(img);
        
        const name = document.createElement("h3");
        name.textContent = member.name;
        name.classList.add("mt-3");
        
        const role = document.createElement("h4");
        role.classList.add("text-muted", "mb-3");
        role.textContent = member.role;
        
        const bio = document.createElement("p");
        bio.textContent = `Grade: ${member.grade} | Hobbies: ${member.hobbies.join(", ")}`;
        bio.classList.add("mb-0");
        
        // Build the card structure
        card.appendChild(imgContainer);
        card.appendChild(name);
        card.appendChild(role);
        card.appendChild(bio);
        
        col.appendChild(card);
        container.appendChild(col);

       
    });
}
displayTeam();


// Dark mode goes below
function modes(){
     console.log("dark mode button was clicked")
    let mode = -1
    mode = -1*mode

    if(mode == 1){
        background("black")
        modeButton.html("light mode")
    }
}
// Add an event listener for clicks
dButton.addEventListener("click", modes);

