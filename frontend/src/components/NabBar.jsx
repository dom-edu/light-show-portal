import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="logo" src="/images/hcz-logo.png" alt="HCZ Logo" style={{ width: 185, height: 80 }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/light-show">Light Show</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/arcade">Arcade</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/team">Meet The Team</Link>
            </li>
            <button id="d-button">dark mode</button>
          </ul>
        </div>
      </div>
    </nav>
  );
}