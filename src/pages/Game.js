import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FiberContainer } from "../three/FiberContainer";
import { useNavigate } from "react-router-dom";
//? COMPONENTS
import CharacterSelect from "../components/CharacterSelect";

//?CONTEXT
import { GameContext } from "../context/GameContext";

//? CUSTOM CSS
import "../styles/StylesGame.css";

import io from "socket.io-client";
const socket = io("http://localhost:3002");

export default function Game() {
  const navigate = useNavigate();
  const {
    result,
    diceString,
    setDice,
    rollDiceWeapon,
    rollDice,
    error,
    charSel,
    selectedCharacter,
  } = useContext(GameContext);
  const { id } = useParams();
  const [otherRoll, setOtherRoll] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [players, setPlayers] = useState([]);

  const handleExitRoom = () => {
    socket.emit("exitRoom", selectedCharacter.charName);
    // navigate("/");
    setPlayers(players.filter((player) => player._id !== selectedCharacter._id));
  };

  useEffect(() => {
    const user = new Date();
    socket.emit("roll", { roll: result, user: user });

    socket.on("userRoll", (data) => {
      setOtherRoll(data.roll);
      setOtherUser(data.user);
    });
  }, [result, rollDice]);

  useEffect(() => {
    socket.on("updatePlayers", (players) => {
      setPlayers(players);
    });
  }, []);

  return (
    <div>
      <h1>
        Your room id is: <strong>{id}</strong>
      </h1>
      <CharacterSelect />
      {!charSel && (
        <div>
          {players.map((player) => (
            <div key={player._id}>
              <div>
                <FiberContainer />
              </div>
              <div>
                <p>{player.charName}</p>
                <p>{player.aC}</p>
                <p>{player.class}</p>
                <p>{player.level}</p>
                <p>{player.initiative}</p>
                <progress
                  className="progress progress-error border border-black border-opacity-50 w-56
                h-3"
                  value={player.hitPoints}
                  max={player.hitPoints}
                ></progress>
              </div>
              <div className="inp-dice">
                <input
                  type="text"
                  name="dice"
                  value={diceString}
                  required
                  onChange={setDice}
                  placeholder="dice"
                ></input>
                <button onClick={rollDice}>Roll</button>
                <p>{result}</p>
                <p>{error}</p>
                <p>{otherRoll && `Other Roll: ${otherRoll}`}</p>
                <p>{otherUser && `Other User: ${otherUser}`}</p>
              </div>
            </div>
          ))}
          <button onClick={handleExitRoom}>Exit game</button>
        </div>
      )}
    </div>
  );
}
