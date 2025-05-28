import React from 'react';
import { Link } from 'react-router-dom';

const games = [
  {
    title: "Pacman",
    path: "/pacman", 
    gameImage: "/images/pac.png",
    isInternal: true
  },
  {
    title: "Memory Game v1.1",
    url: "https://scratch.mit.edu/projects/1113114501/fullscreen",
    gameImage: "/images/memory_placeholder.png",
    isInternal: false
  },
  {
    title: "bootleg tetris",
    url: "https://scratch.mit.edu/projects/1180970330/fullscreen",
    gameImage: "/images/Circle Illusion_placeholder_game.png",
    isInternal: false
  },
  {
    title: "Year of the Snake",
    url: "https://scratch.mit.edu/projects/1118851459/fullscreen/",
    gameImage: "/images/pixel-art/art3.png",
    isInternal: false
  },
  {
    title: "Maze Runner",
    url: "https://scratch.mit.edu/projects/123456789/fullscreen/",
    gameImage: "/images/pixel-art/art1.png",
    isInternal: false
  },
  {
    title: "Space Blaster",
    url: "https://scratch.mit.edu/projects/987654321/fullscreen/",
    gameImage: "/images/pixel-art/art2.png",
    isInternal: false
  },
  {
    title: "Color Match",
    url: "https://scratch.mit.edu/projects/192837465/fullscreen/",
    gameImage: "/images/pixel-art/art2.png",
    isInternal: false
  },
  {
    title: "Reflex Challenge",
    url: "https://scratch.mit.edu/projects/564738291/fullscreen/",
    gameImage: "/images/pixel-art/art3.png",
    isInternal: false
  },
  {
    title: "Catch the Dot",
    url: "https://scratch.mit.edu/projects/847362514/fullscreen/",
    gameImage: "/images/pixel-art/art3.png",
    isInternal: false
  },
];

const Arcade = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Give Our Games A Try</h2> 
      <div className="row g-4">
        {games.map((game, index) => (
          <div className="col-md-4 d-flex justify-content-center" key={game.title}>
            <div className="card text-white bg-dark border-0" style={{ width: "20rem" }}>
              <img
                src={game.gameImage || "https://via.placeholder.com/300x200"}
                className="card-img-top"
                alt={game.title}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-primary">{game.title}</h5>
                <p className="card-text">Experience the excitement of {game.title}</p>
                
                {game.isInternal ? (
                  <Link 
                    to={game.path}
                    className="btn btn-primary text-white text-decoration-none"
                  >
                    Play Now
                  </Link>
                ) : (
                  <a
                    href={game.url}
                    className="btn btn-primary text-white text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Play Now
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arcade;