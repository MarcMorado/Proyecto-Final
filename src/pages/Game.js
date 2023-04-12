import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FiberContainer } from "../three/FiberContainer";
import { useNavigate } from "react-router-dom";
//? COMPONENTS
import CharacterSelect from "../components/CharacterSelect";
import Enemy from "../components/Boss";

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
    playerRolls,
  } = useContext(GameContext);
  const { id } = useParams();
  const [otherRoll, setOtherRoll] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [players, setPlayers] = useState([]);

  const handleExitRoom = () => {
    socket.emit("exitRoom", selectedCharacter.charName);
    // navigate("/");
    setPlayers(
      players.filter((player) => player._id !== selectedCharacter._id)
    );
  };
  useEffect(() => {
    const user = selectedCharacter._id;
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
  console.log(players);
  return (
    <div>
      <h1>
        Your room id is: <strong>{id}</strong>
      </h1>
      <CharacterSelect />

      {!charSel && (
        <div>
          <Enemy />
          <div className="game-characters">
            <div className="character-game">
              <div className="game-player">
                <div className="dice-result">
                  <p>{playerRolls[selectedCharacter._id]}</p>
                </div>
                <div className="game-3dmodel">
                  <FiberContainer />
                </div>
                <div>
                  <p className="game-name">{selectedCharacter.charName}</p>
                  <p className="game-class">
                    {selectedCharacter.class} lvl: {selectedCharacter.level}
                  </p>
                  <div className="game-health">
                    <p className="game-armor" title="amor class">
                      {selectedCharacter.armorClass}
                    </p>
                    <progress
                      className="progress progress-error border border-black border-opacity-50 w-56
                h-3"
                      value={selectedCharacter.hitPoints}
                      max={selectedCharacter.hitPoints}
                    ></progress>
                    <p className="game-initiative" title="initiative">
                      {selectedCharacter.initiative}
                    </p>
                  </div>
                </div>
                <div className="inp-dice">
                  <div className="inp-dice-pos">
                    <input
                      type="text"
                      name="dice"
                      value={diceString}
                      required
                      onChange={setDice}
                      placeholder="dice"
                    ></input>
                    <button onClick={rollDice}>Roll</button>
                  </div>
                  <p>{error}</p>
                </div>
              </div>
              {players
                .filter((player) => player._id !== selectedCharacter._id)
                .map((player) => (
                  <div key={player._id} className="game-player">
                    <div className="dice-result">
                      <p>{playerRolls[player._id]}</p>
                    </div>
                    <div className="game-3dmodel">
                      <FiberContainer />
                    </div>
                    <div>
                      <p className="game-name">{player.charName}</p>
                      <p className="game-class">
                        {player.class} lvl: {player.level}
                      </p>
                      <div className="game-health">
                        <p className="game-armor" title="amor class">
                          {player.armorClass}
                        </p>
                        <progress
                          className="progress progress-error border border-black border-opacity-50 w-56
                h-3"
                          value={player.hitPoints}
                          max={player.hitPoints}
                        ></progress>
                        <p className="game-initiative" title="initiative">
                          {player.initiative}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              <button className="exit-game" onClick={handleExitRoom}>
                Exit game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
