import "./Login.css";
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import { useState } from "react";
import axios from 'axios'; // Import Axios

const API_URL = 'http://localhost:8080/api/users'; // Adjust this URL based on your API

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const user = { name, email, password };
      const response = await axios.post(API_URL, user);
      console.log("User registered:", response.data);
      // Handle success, e.g., show a success message or redirect to login page
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      console.log("User logged in:", response.data);
      // Handle success, e.g., show a success message or redirect to dashboard
    } catch (error) {
      console.error("Error logging in user:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleSubmit = () => {
    if (action === "Sign Up") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt=""/>
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt=""/>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="input">
          <img src={password_icon} alt=""/>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
      </div>
      {action === "Sign Up" ? null : (
        <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
      )}
      <div className="submit-container">
        <div 
          className={action === "Login" ? "submit gray" : "submit"} 
          onClick={handleSubmit}
        >
          {action}
        </div>
        <div 
          className={action === "Sign Up" ? "submit gray" : "submit"} 
          onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}
        >
          {action === "Login" ? "Sign Up" : "Login"}
        </div>
      </div>
    </div>
  );
};

export default Login;
