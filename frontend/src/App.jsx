import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HexExporter from './pages/HexConverter'
import Navbar from './components/NavBar'
import LandingPage from './pages/LandingPage';
import TeamPage from './pages/TeamPage';
import Arcade from './pages/Arcade';
import PacmanGame from './pages/PacmanGame';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/arcade" element={<Arcade />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/pacman" element={<PacmanGame />} />
        <Route path="/light-show" element={<HexExporter />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </>
  );
}

export default App
