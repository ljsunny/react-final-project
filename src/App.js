import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Master from "./pages/Master";
import Login from "./pages/Login";
import Nopage from "./pages/Nopage";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import PlayHome from "./pages/playlist/PlayHome";
import Profile from "./pages/Profile";
import SnowEffect from "./components/SnowEffect";
import "./css/main.css";

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem('loggedInUserId'));

  const handleLogin = (userId) => {
    setLoggedInUserId(userId);
    localStorage.setItem("loggedInUserId", userId); // store login
  };

  const handleLogout = () => {
    setLoggedInUserId(null);
    localStorage.removeItem("loggedInUserId"); // delete
  };

  return (
    <div className="wrap">
      <SnowEffect/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master isLogin={loggedInUserId}/>}>
            {loggedInUserId ? 
            <>
              <Route index element={<Home />} />
              <Route path="play/*" element={<PlayHome />} />
              <Route path="/profile" element={<Profile userId={loggedInUserId}/>} />
              <Route path="logout" element={<Logout onLogout={handleLogout}/>} /> 
            </>
              : 
              <>
                <Route path="login" element={<Login onLogin={handleLogin} />} />
                <Route path="register" element={<Register/>} /> 
              </>
            }
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
