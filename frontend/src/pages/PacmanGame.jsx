import React, { useEffect, useState, useRef } from "react";
import "../Pacman.css";

const PacmanGame = () => {
  const [position, setPosition] = useState({ row: 1, col: 1 });
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [maze, setMaze] = useState([]);
  const [ghosts, setGhosts] = useState([
    { row: 3, col: 3, color: 'red', direction: 'up' },
    { row: 3, col: 4, color: 'pink', direction: 'left' }
  ]);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const lastGhostMoveRef = useRef(0);
  const ghostSpeed = 500; // milliseconds between ghost moves

  // Initialize maze with walls and dots
  useEffect(() => {
    const initialMaze = Array(10).fill().map(() => Array(10).fill(0));
    
    // Add walls
    for (let i = 0; i < 10; i++) {
      initialMaze[0][i] = 1; // top wall
      initialMaze[9][i] = 1; // bottom wall
      initialMaze[i][0] = 1; // left wall
      initialMaze[i][9] = 1; // right wall
    }
    
    // Add some inner walls
    initialMaze[4][2] = 1;
    initialMaze[4][3] = 1;
    initialMaze[4][4] = 1;
    initialMaze[5][6] = 1;
    initialMaze[6][6] = 1;
    initialMaze[7][6] = 1;
    
    // Add dots (2 represents a dot)
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        if (initialMaze[i][j] === 0) {
          initialMaze[i][j] = 2;
        }
      }
    }
    
    setMaze(initialMaze);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive) return;
      
      let newDirection = direction;
      
      if (e.key === "ArrowUp") newDirection = 'up';
      else if (e.key === "ArrowDown") newDirection = 'down';
      else if (e.key === "ArrowLeft") newDirection = 'left';
      else if (e.key === "ArrowRight") newDirection = 'right';
      else return;
      
      setDirection(newDirection);
      movePacman(newDirection);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameActive, direction, maze]);

  // Game loop
  useEffect(() => {
    if (!gameActive) return;

    const gameLoop = (timestamp) => {
      // Move ghosts at regular intervals
      if (!lastGhostMoveRef.current || timestamp - lastGhostMoveRef.current > ghostSpeed) {
        moveGhosts();
        lastGhostMoveRef.current = timestamp;
      }
      
      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameActive, maze]);

  const movePacman = (dir) => {
    setPosition(prev => {
      let newRow = prev.row;
      let newCol = prev.col;
      
      if (dir === 'up') newRow--;
      else if (dir === 'down') newRow++;
      else if (dir === 'left') newCol--;
      else if (dir === 'right') newCol++;

      // Check walls and bounds
      if (newRow < 0 || newRow >= maze.length || 
          newCol < 0 || newCol >= maze[0].length || 
          maze[newRow][newCol] === 1) {
        return prev;
      }

      // Check if we're eating a dot
      if (maze[newRow][newCol] === 2) {
        setScore(prevScore => prevScore + 10);
        const newMaze = [...maze];
        newMaze[newRow][newCol] = 0;
        setMaze(newMaze);
      }

      // Check collision with ghosts
      for (const ghost of ghosts) {
        if (newRow === ghost.row && newCol === ghost.col) {
          setGameActive(false);
          return prev;
        }
      }

      return { row: newRow, col: newCol };
    });
  };

  const moveGhosts = () => {
    setGhosts(prevGhosts => {
      return prevGhosts.map(ghost => {
        const directions = ['up', 'down', 'left', 'right'];
        let newRow = ghost.row;
        let newCol = ghost.col;
        let newDirection = ghost.direction;
        
        // Try current direction first
        if (newDirection === 'up') newRow--;
        else if (newDirection === 'down') newRow++;
        else if (newDirection === 'left') newCol--;
        else if (newDirection === 'right') newCol++;
        
        // If current direction is blocked, choose a random new one
        if (newRow < 0 || newRow >= maze.length || 
            newCol < 0 || newCol >= maze[0].length || 
            maze[newRow][newCol] === 1) {
          const possibleDirections = directions.filter(dir => {
            let testRow = ghost.row;
            let testCol = ghost.col;
            
            if (dir === 'up') testRow--;
            else if (dir === 'down') testRow++;
            else if (dir === 'left') testCol--;
            else if (dir === 'right') testCol++;
            
            return !(testRow < 0 || testRow >= maze.length || 
                    testCol < 0 || testCol >= maze[0].length || 
                    maze[testRow][testCol] === 1);
          });
          
          if (possibleDirections.length > 0) {
            newDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
            
            newRow = ghost.row;
            newCol = ghost.col;
            if (newDirection === 'up') newRow--;
            else if (newDirection === 'down') newRow++;
            else if (newDirection === 'left') newCol--;
            else if (newDirection === 'right') newCol++;
          } else {
            // Ghost is stuck (shouldn't happen in proper maze)
            newRow = ghost.row;
            newCol = ghost.col;
          }
        }
        
        return { ...ghost, row: newRow, col: newCol, direction: newDirection };
      });
    });
  };

  const resetGame = () => {
    setPosition({ row: 1, col: 1 });
    setDirection('right');
    setScore(0);
    setGameActive(true);
    setGhosts([
      { row: 3, col: 3, color: 'red', direction: 'up' },
      { row: 3, col: 4, color: 'pink', direction: 'left' }
    ]);
    
    // Reset dots
    const newMaze = [...maze];
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        if (newMaze[i][j] === 0 && !(i === 1 && j === 1)) {
          newMaze[i][j] = 2;
        }
      }
    }
    setMaze(newMaze);
  };

  const getMouthAngle = () => {
    switch (direction) {
      case 'up': return -90;
      case 'down': return 90;
      case 'left': return 180;
      case 'right': return 0;
      default: return 0;
    }
  };

  return (
    <div className="pacman-container" tabIndex={0}>
      <div className="score-display">Score: {score}</div>
      
      {!gameActive && (
        <div className="game-over-modal">
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <button 
            onClick={resetGame}
            className="reset-button"
          >
            Play Again
          </button>
        </div>
      )}
      
      <div className="board">
        {maze.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((tile, colIndex) => (
              <div 
                key={colIndex} 
                className={`tile ${
                  rowIndex === position.row && colIndex === position.col 
                    ? 'pacman' 
                    : ''
                } ${
                  tile === 1 ? 'wall' : ''
                } ${
                  tile === 2 ? 'dot' : ''
                }`}
                style={{
                  '--mouth-angle': `${getMouthAngle()}deg`
                }}
              >
                {ghosts.map((ghost, ghostIndex) => (
                  rowIndex === ghost.row && colIndex === ghost.col && (
                    <div 
                      key={ghostIndex} 
                      className={`ghost ${ghost.color}`}
                    />
                  )
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PacmanGame;