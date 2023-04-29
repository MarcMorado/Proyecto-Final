import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/StyleLogSign.css";

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPassword("");
    setEmail("");
    try {
      const response = await axios.post("http://sanctum.up.railway.app/signup", {
        username,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
    if (email !== null && password !== null) {
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-component">
        <h2 className="login-title">SING UP</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="btn-log">
            <button className="login-Btn">SIGN UP</button>
          </div>
        </form>
      </div>
    </div>
  );
}
