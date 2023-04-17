import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/StyleLogSign.css";
import { CharacterCreateContext } from "../context/CharacterCreateContext";
import { useContext } from "react";

export default function Login() {
  const { saveId } = useContext(CharacterCreateContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const gotoSingUpPage = () => navigate("/signup");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPassword("");
    setEmail("");

    axios
      .post("http://localhost:3001/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        const { userId, token, username, emailB } = response.data;
        saveId(userId);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", emailB);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
          <div className="btn-log">
            <button className="login-Btn">SIGN IN</button>
          </div>
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
