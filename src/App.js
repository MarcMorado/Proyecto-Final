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

function App() {
  const logged = localStorage.getItem("isLoggedIn");
  console.log("is logged",logged);
  const location = useLocation();
  const hideNav = /^\/game\/.*/.test(location.pathname);
  const renderComponent = (Component) => {
    if (logged == null) {
      console.log("el if es", true);
      return <Component />;
    } else {
      console.log("el if es", false);
      return redirect("/login") 
    }
  };

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
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                          path="/new-char"
                          render={() => renderComponent(CreateChar)}
                        />
                        <Route
                          path="/my-characters"
                          render={() => renderComponent(CharacterList)}
                        />
                        <Route
                          path="/my-profile"
                          render={() => renderComponent(Profile)}
                        />
                        <Route
                          exact
                          path="/game"
                          render={() => renderComponent(Game)}
                        />
                        <Route
                          path="/find-game"
                          render={() => renderComponent(CreateGame)}
                        />
                        <Route
                          path="/game/:id"
                          render={() => renderComponent(Game)}
                        />
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
