import "./Login.css";
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import { useState } from "react";
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users'; 

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    try {
      const user = { name, email, password };
      const response = await axios.post(API_URL, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("User registered:", response.data);
      setMessage("Registration successful!");
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("User logged in:", response.data);
      setMessage("Login successful!");
    } catch (error) {
      console.error("Error logging in user:", error);
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
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
          className={`submit ${loading ? 'gray' : ''}`} 
          onClick={loading ? () => {} : handleSubmit}
        >
          {loading ? "Loading..." : action}
        </div>
        <div 
          className={`submit ${action === "Sign Up" ? 'gray' : ''}`} 
          onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}
        >
          {action === "Login" ? "Sign Up" : "Login"}
        </div>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Login;
