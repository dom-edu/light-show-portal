import React, { useEffect, useState, useRef } from "react";
import "../Pacman.css";

const PacmanGame = () => {
  const [position, setPosition] = useState({ row: 1, col: 1 });
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [maze, setMaze] = useState([]);
  const [ghosts, setGhosts] = useState([
    { row: 3, col: 3, color: 'red', direction: 'up' },
    { row: 3, col: 4, color: 'pink', direction: 'left' }
  ]);
  const containerRef = useRef(null);

  // Initialize maze
  useEffect(() => {
    const initialMaze = Array(10).fill().map(() => Array(10).fill(0));
    
    // Walls
    for (let i = 0; i < 10; i++) {
      initialMaze[0][i] = 1;
      initialMaze[9][i] = 1;
      initialMaze[i][0] = 1;
      initialMaze[i][9] = 1;
    }
    
    // Inner walls
    initialMaze[4][2] = 1;
    initialMaze[4][3] = 1;
    initialMaze[4][4] = 1;
    initialMaze[5][6] = 1;
    initialMaze[6][6] = 1;
    initialMaze[7][6] = 1;
    
    // Dots
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        if (initialMaze[i][j] === 0) initialMaze[i][j] = 2;
      }
    }
    
    setMaze(initialMaze);
    containerRef.current?.focus();
    document.body.classList.add('pacman-game-active');
    
    return () => {
      document.body.classList.remove('pacman-game-active');
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive) return;
      
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      let newDir = direction;
      if (e.key === "ArrowUp") newDir = 'up';
      else if (e.key === "ArrowDown") newDir = 'down';
      else if (e.key === "ArrowLeft") newDir = 'left';
      else if (e.key === "ArrowRight") newDir = 'right';
      else return;
      
      setDirection(newDir);
      movePacman(newDir);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, direction, maze]);

  // Ghost movement
  useEffect(() => {
    if (!gameActive) return;
    
    const ghostInterval = setInterval(() => {
      setGhosts(prevGhosts => 
        prevGhosts.map(ghost => {
          const directions = ['up', 'down', 'left', 'right'];
          let newRow = ghost.row;
          let newCol = ghost.col;
          let newDir = ghost.direction;
          
          if (newDir === 'up') newRow--;
          else if (newDir === 'down') newRow++;
          else if (newDir === 'left') newCol--;
          else if (newDir === 'right') newCol++;
          
          if (maze[newRow]?.[newCol] === 1 || newRow < 0 || newRow >= 10 || newCol < 0 || newCol >= 10) {
            const possibleDirs = directions.filter(dir => {
              let testRow = ghost.row;
              let testCol = ghost.col;
              if (dir === 'up') testRow--;
              else if (dir === 'down') testRow++;
              else if (dir === 'left') testCol--;
              else if (dir === 'right') testCol++;
              return maze[testRow]?.[testCol] !== 1 && testRow >= 0 && testRow < 10 && testCol >= 0 && testCol < 10;
            });
            
            if (possibleDirs.length > 0) {
              newDir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
              newRow = ghost.row;
              newCol = ghost.col;
              if (newDir === 'up') newRow--;
              else if (newDir === 'down') newRow++;
              else if (newDir === 'left') newCol--;
              else if (newDir === 'right') newCol++;
            }
          }
          
          return { ...ghost, row: newRow, col: newCol, direction: newDir };
        })
      );
    }, 500);

    return () => clearInterval(ghostInterval);
  }, [gameActive, maze]);

  const movePacman = (dir) => {
    setPosition(prev => {
      let newRow = prev.row;
      let newCol = prev.col;
      
      if (dir === 'up') newRow--;
      else if (dir === 'down') newRow++;
      else if (dir === 'left') newCol--;
      else if (dir === 'right') newCol++;

      if (maze[newRow]?.[newCol] === 1 || newRow < 0 || newRow >= 10 || newCol < 0 || newCol >= 10) {
        return prev;
      }

      if (maze[newRow][newCol] === 2) {
        const newMaze = [...maze];
        newMaze[newRow][newCol] = 0;
        setMaze(newMaze);
        setScore(prev => prev + 10);

        // WIN CONDITION CHECK
        const pelletsRemaining = newMaze.flat().filter(cell => cell === 2).length;
        if (pelletsRemaining === 0) {
          setGameWon(true);
          setGameActive(false);
        }
      }

      if (ghosts.some(g => g.row === newRow && g.col === newCol)) {
        setGameWon(false);
        setGameActive(false);
      }

      return { row: newRow, col: newCol };
    });
  };

  const resetGame = () => {
    setPosition({ row: 1, col: 1 });
    setDirection('right');
    setScore(0);
    setGameActive(true);
    setGameWon(false);
    setGhosts([
      { row: 3, col: 3, color: 'red', direction: 'up' },
      { row: 3, col: 4, color: 'pink', direction: 'left' }
    ]);
    
    // Reset all pellets
    const newMaze = [...maze];
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        if (newMaze[i][j] === 0) {
          newMaze[i][j] = 2;
        }
      }
    }
    setMaze(newMaze);
    
    containerRef.current?.focus();
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

  // Touch controls
  const handleTouchStart = (dir) => {
    setDirection(dir);
    movePacman(dir);
  };

  return (
    <div className="pacman-container" ref={containerRef} tabIndex={0}>
      <div className="score-display">Score: {score}</div>
      
      {!gameActive && (
        <div className={`game-over-modal ${gameWon ? 'win' : 'lose'}`}>
          <h2>{gameWon ? "YOU WIN!" : "GAME OVER!"}</h2>
          <p>Final Score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      <div className="board">
        {maze.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((tile, colIndex) => (
              <div 
                key={colIndex}
                className={`tile 
                  ${position.row === rowIndex && position.col === colIndex ? 'pacman' : ''}
                  ${tile === 1 ? 'wall' : ''}
                  ${tile === 2 ? 'dot' : ''}`}
                style={{ '--mouth-angle': `${getMouthAngle()}deg` }}
              >
                {ghosts.map((ghost, i) => (
                  ghost.row === rowIndex && ghost.col === colIndex && (
                    <div key={i} className={`ghost ${ghost.color}`} />
                  )
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="touch-controls">
        <div className="touch-row">
          <div className="touch-button" onTouchStart={() => handleTouchStart('up')}>↑</div>
        </div>
        <div className="touch-row">
          <div className="touch-button" onTouchStart={() => handleTouchStart('left')}>←</div>
          <div className="touch-button" onTouchStart={() => handleTouchStart('down')}>↓</div>
          <div className="touch-button" onTouchStart={() => handleTouchStart('right')}>→</div>
        </div>
      </div>
    </div>
  );
};

export default PacmanGame;