import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Master from "./pages/Master";
import Login from "./pages/Login";
import Nopage from "./pages/Nopage";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import PlayList from "./pages/playlist/PlayList";
import "./css/main.css";

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem('loggedInUserId'));

  const handleLogin = (userId) => {
    setLoggedInUserId(userId);
  };

  const handleLogout = () => {
    setLoggedInUserId(null);
  };

  return (
    <div style={{ backgroundColor: "#fff"}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Master isLogin={loggedInUserId}/>}>
          <Route index element={<Home />} />
          <Route path="play-list" element={<PlayList />} />
          {loggedInUserId ? 
            <Route path="logout" element={<Logout onLogout={handleLogout}/>} /> 
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
