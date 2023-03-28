import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StyleLogSign.css";

export default function Login() {
  const emailCheck = localStorage.getItem("email");
  const passwordCheck = localStorage.getItem("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let errorEmail = true;
  let errorPassword = true;

  const gotoSingUpPage = () => navigate("/signup");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword("");
    setEmail("");
    if (email === emailCheck) {
      localStorage.setItem("email", email);
      errorEmail = false;
    }
    if (password === passwordCheck) {
      localStorage.setItem("password", password);
      errorPassword = false;
    }
    if (errorEmail === false && errorPassword === false) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-component">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button className="login-Btn">SIGN IN</button>
          <p>
            Don't have an account?{" "}
            <span className="link" onClick={gotoSingUpPage}>
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
