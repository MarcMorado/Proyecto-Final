import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, redirect, useLocation } from "react-router-dom";
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
import { OtherPlayersProvider } from "./context/OtherPlayersContext";
import PrivateRoutes from "./components/PrivateRoutes";

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
                <OtherPlayersProvider>
                  <GameProvider>
                    <div className="App">
                      {!hideNav && <Navbar />}
                      <div className="">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          <Route element={<PrivateRoutes />}>
                            <Route element={<CreateChar />} path="/new-char" />
                            <Route
                              element={<CharacterList />}
                              path="/my-characters"
                            />
                            <Route element={<Profile />} path="/my-profile" />
                            <Route element={<Game />} exact path="/game" />
                            <Route element={<CreateGame />} path="/find-game" />
                            <Route element={<Game />} path="/game/:id" />
                          </Route>
                        </Routes>
                      </div>
                    </div>
                  </GameProvider>
                </OtherPlayersProvider>
              </CharacterCreateProvider>
            </CharacterProvider>
          </CharacterCreateProvider>
        </CreateGameProvider>
      </ArmorProvider>
    </WeaponProvider>
  );
}

export default App;
