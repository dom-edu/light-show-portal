const games = [
    {
        title: "Memory Game v1.1",
        url: "https://scratch.mit.edu/projects/1113114501/fullscreen",
        gameImage: "static/images/memory_placeholder.png"
    }, 
    {
        title: "Red Circle Illusion",
        url: "https://scratch.mit.edu/projects/1116795309/fullscreen/",
        gameImage: "static/images/Circle Illusion_placeholder_game.png"
    },
    {
        title: "placeholder game 2",
        url: "https://scratch.mit.edu/projects/1118851459/fullscreen/",
        gameImage: "static/images/snake_placeholder.png"   
    }
]

const container = document.getElementById("games-container")

function displayGames() {
    games.forEach(game => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "d-flex", "justify-content-center");

        const card = document.createElement("div");
        card.classList.add("card", "text-white", "bg-dark", "border-0");
        card.style.width = "20rem";

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = game.gameImage || "https://via.placeholder.com/300x200";
        img.alt = game.title;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "text-center");

        const title = document.createElement("h5");
        title.classList.add("card-title", "fw-bold", "text-primary");
        title.textContent = game.title;

        const description = document.createElement("p");
        description.classList.add("card-text");
        description.textContent = "Experience the excitement of " + game.title;

        const playButton = document.createElement("a");
        playButton.classList.add("btn", "btn-primary", "text-white");
        playButton.href = game.url;
        playButton.target = "_blank";
        playButton.textContent = "Play Now";

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(playButton);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        container.appendChild(col);
    });
}

displayGames()