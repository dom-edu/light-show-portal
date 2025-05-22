import React from "react";

const games = [
  {
    title: "Memory Game v1.1",
    url: "https://scratch.mit.edu/projects/1113114501/fullscreen",
    gameImage: "/static/images/memory_placeholder.png",
  },
  {
    title: "Red Circle Illusion",
    url: "https://scratch.mit.edu/projects/1116795309/fullscreen/",
    gameImage: "/static/images/Circle Illusion_placeholder_game.png",
  },
  {
    title: "Year of the Snake",
    url: "https://scratch.mit.edu/projects/1118851459/fullscreen/",
    gameImage: "/static/images/snake_placeholder.png",
  },
  {
    title: "Maze Runner",
    url: "https://scratch.mit.edu/projects/123456789/fullscreen/",
    gameImage: "/static/images/maze_placeholder.png",
  },
  {
    title: "Space Blaster",
    url: "https://scratch.mit.edu/projects/987654321/fullscreen/",
    gameImage: "/static/images/space_placeholder.png",
  },
  {
    title: "Color Match",
    url: "https://scratch.mit.edu/projects/192837465/fullscreen/",
    gameImage: "/static/images/color_placeholder.png",
  },
  {
    title: "Reflex Challenge",
    url: "https://scratch.mit.edu/projects/564738291/fullscreen/",
    gameImage: "/static/images/reflex_placeholder.png",
  },
  {
    title: "Catch the Dot",
    url: "https://scratch.mit.edu/projects/847362514/fullscreen/",
    gameImage: "/static/images/dot_placeholder.png",
  },
  {
    title: "Puzzle Time",
    url: "https://scratch.mit.edu/projects/019283746/fullscreen/",
    gameImage: "/static/images/puzzle_placeholder.png",
  },
];

const Arcade = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Give Our Games A Try</h2> 
      <div className="row g-4">
        {games.map((game, index) => (
          <div className="col-md-4 d-flex justify-content-center" key={index}>
            <div className="card text-white bg-dark border-0" style={{ width: "20rem" }}>
              <img
                src={game.gameImage || "https://via.placeholder.com/300x200"}
                className="card-img-top"
                alt={game.title}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-primary">{game.title}</h5>
                <p className="card-text">Experience the excitement of {game.title}</p>
                <a
                  href={game.url}
                  className="btn btn-primary text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Play Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arcade;
