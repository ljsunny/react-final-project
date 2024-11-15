import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Master from "./pages/Master";
import Login from "./pages/Login";
import Nopage from "./pages/Nopage";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import PlayHome from "./pages/playlist/PlayHome";

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem('loggedInUserId'));

  const handleLogin = (userId) => {
    setLoggedInUserId(userId);
  };

  const handleLogout = () => {
    setLoggedInUserId(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Master isLogin={loggedInUserId}/>}>
          {loggedInUserId ? 
          <>
            <Route index element={<Home />} />
            <Route path="play/*" element={<PlayHome />} />
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

  );
}

export default App;
