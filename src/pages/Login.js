import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const navigate = useNavigate();

  const loadUserData = () => {
    if (!localStorage.getItem('users')) {
      //add json file or just add []
      localStorage.setItem('users', JSON.stringify([])); 
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleLogin = () => {
    const storedUserData = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUserData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setAlertClass('alert alert-success');
      setMessage('Login Success!');
      console.log(user)
      localStorage.setItem('loggedInUserId', user.id);
      onLogin(user.id);
      navigate("/"); 
    } else {
      setAlertClass('alert alert-danger');
      setMessage('Login Fail');
    }
  };

  return (
    <div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && (
        <div className={alertClass} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
