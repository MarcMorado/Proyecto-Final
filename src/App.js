import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateChar from "./pages/CreateChar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CharacterList from "./pages/CharacterList";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import CreateGame from "./pages/CreateGame";
import { WeaponProvider } from "./context/WeaponContext";
import { ArmorProvider } from "./context/ArmorContext";
import io from "socket.io-client";
import { useEffect } from "react";
import { CreateGameProvider } from "./context/CreateGameContext";
import { CharacterProvider } from "./context/CharacterContext";

function App() {
  const socket = io("http://localhost:3002");

  useEffect(() => {
    socket.emit("mensaje", "Hola desde el cliente");
  }, []);

  return (
    <WeaponProvider>
      <ArmorProvider>
        <CreateGameProvider>
          <CharacterProvider>
            <div className="App">
              <Navbar />
              <div className="">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/new-char" element={<CreateChar />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/my-characters" element={<CharacterList />} />
                  <Route path="/my-profile" element={<Profile />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/find-game" element={<CreateGame />} />
                  <Route path="/game/:id" element={<Game />} />
                </Routes>
              </div>
            </div>
          </CharacterProvider>
        </CreateGameProvider>
      </ArmorProvider>
    </WeaponProvider>
  );
}

export default App;
