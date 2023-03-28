import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [correctPassword, setCorrectPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setPassword(localStorage.getItem("password"));
    setUsername(localStorage.getItem("username"));
  }, []);

  const passwordChecking = () => {
    if (passwordCheck === password) setCorrectPassword(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword("");
    setEmail("");
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("username", username);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <div className="login-container">
      <div className="login-component">
        <h2 className="login-title">Profile</h2>
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
          {!correctPassword ? (
            <div>
              <p>Please enter your password</p>
              <input
                type="password"
                id="password"
                name="password"
                value={passwordCheck}
                required
                onChange={(e) => setPasswordCheck(e.target.value)}
              ></input>
              <button onClick={passwordChecking}>Change password</button>
            </div>
          ) : (
            <div>
              <p>New password</p>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          )}

          <button className="login-Btn">Change Information</button>
        </form>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
