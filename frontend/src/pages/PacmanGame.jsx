import React, { useEffect, useState } from "react";
import "../Pacman.css";

const PacmanGame = () => {
  const [position, setPosition] = useState({ row: 1, col: 1 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition(prev => {
        let newRow = prev.row;
        let newCol = prev.col;
        
        if (e.key === "ArrowUp") newRow--;
        else if (e.key === "ArrowDown") newRow++;
        else if (e.key === "ArrowLeft") newCol--;
        else if (e.key === "ArrowRight") newCol++;
        else return prev;

        // Simple bounds checking
        if (newRow < 0 || newRow > 5 || newCol < 0 || newCol > 5) {
          return prev;
        }

        return { row: newRow, col: newCol };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Create a simple 6x6 grid
  const grid = Array(6).fill().map(() => Array(6).fill(0));

  return (
    <div className="pacman-container" tabIndex={0}>
      <div className="board">
        {grid.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((_, colIndex) => (
              <div 
                key={colIndex} 
                className={`tile ${
                  rowIndex === position.row && colIndex === position.col 
                    ? 'pacman' 
                    : ''
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PacmanGame;