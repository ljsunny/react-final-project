import { Link } from "react-router-dom";

export default function Navbar({isLogin}) {
  return (
    <nav style={{ width: "380px", backgroundColor: "#fff" }}>
      <div>
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/" aria-current="page">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/play-list" aria-current="page">
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
    </nav>
  );
}
