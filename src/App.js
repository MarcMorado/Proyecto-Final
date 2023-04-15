import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { CreateGameProvider } from "./context/CreateGameContext";
import { CharacterProvider } from "./context/CharacterContext";
import { GameProvider } from "./context/GameContext";
import { CharacterCreateProvider } from "./context/CharacterCreateContext";

function App() {
  const location = useLocation();
  const hideNav = /^\/game\/.*/.test(location.pathname);  
  return (
    <WeaponProvider>
      <ArmorProvider>
        <CreateGameProvider>
          <CharacterCreateProvider>
            <CharacterProvider>
              <CharacterCreateProvider>
                <GameProvider>
                  <div className="App">
                    {!hideNav && <Navbar />}
                    <div className="">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/new-char" element={<CreateChar />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                          path="/my-characters"
                          element={<CharacterList />}
                        />
                        <Route path="/my-profile" element={<Profile />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/find-game" element={<CreateGame />} />
                        <Route path="/game/:id" element={<Game />} />
                      </Routes>
                    </div>
                  </div>
                </GameProvider>
              </CharacterCreateProvider>
            </CharacterProvider>
          </CharacterCreateProvider>
        </CreateGameProvider>
      </ArmorProvider>
    </WeaponProvider>
  );
}

export default App;
