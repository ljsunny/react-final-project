import { Link } from "react-router-dom";
import "../css/main.css";

export default function Navbar({ isLogin }) {
  return (
    <div className="nav-wrap">
      <nav style={{ backgroundColor: "#f2f2f2" }} className="navbar navbar-expand-lg nav-icon">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{ width: "15px", height: "15px"}}></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/play" aria-current="page">
                  PlayList
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dash" aria-current="page">
                  Dashboard
                </Link>
              </li>
              {isLogin !== null ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/logout" aria-current="page">
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" aria-current="page">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register" aria-current="page">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
