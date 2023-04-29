import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StyleLogSign.css";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [correctPassword, setCorrectPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const oldEmail = localStorage.getItem("email");

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setUsername(localStorage.getItem("username"));
  }, []);

  const passwordChecking = (e) => {
    e.preventDefault();
    console.log(oldEmail);
    axios
      .post("https://sanctum.up.railway.app/checkPassword", {
        oldEmail,
        passwordCheck,
      })
      .then((response) => {
        console.log(response);
        const { checked } = response.data;
        if(checked){
          console.log(checked);
          setCorrectPassword(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newEmail = email;
    try {
      const response = await axios.post('https://sanctum.up.railway.app/updateUser', {
        username,
        newEmail,
        password,
        oldEmail
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <div className="login-container">
      <div className="login-component">
        <h2 className="login-title">Profile</h2>
        <form className="login-form">
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
          {!correctPassword ? (
            <div className="edit-password">
              <p>Please enter your old password</p>
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
            <div className="new-password">
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

          <button className="login-Btn" onClick={handleSubmit}>Change InformaTion</button>
        </form>
      </div>
      <div>
        <button onClick={handleLogout}>LogouT</button>
      </div>
    </div>
  );
}
