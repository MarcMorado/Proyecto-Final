import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FiberContainer } from "../three/FiberContainer";
import { useNavigate } from "react-router-dom";
//? COMPONENTS
import CharacterSelect from "../components/CharacterSelect";
import Enemy from "../components/Boss";
import CharacterSheet from "../components/CharacterSheet";

//?CONTEXT
import { GameContext } from "../context/GameContext";
import { CharacterContext } from "../context/CharacterContext";

//? CUSTOM CSS
import "../styles/StylesGame.css";



export default function Game() {
  const {
    result,
    diceString,
    setDice,
    bossRolls,
    bossResult,
    bossRoll,
    rollDice,
    error,
    charSel,
    selectedCharacter,
    playerRolls,
    otherRoll,
    otherUser,
    handleExitRoom,
    players,
  } = useContext(GameContext);
  const { open } = useContext(CharacterContext);
  const { id } = useParams();
  const [hpP1, sethpP1] = useState(selectedCharacter.hitPoints)
  const [hpP2, sethpP2] = useState(players[1].hitPoints)
  
  const handleBossAttack = () => {
    const targetPlayer = Math.floor(Math.random() * 2) + 1; // select player 1 or 2 randomly
    // reduce the target player's hit points by the boss's attack value
    if (targetPlayer === 1) {
      sethpP1((prev) => prev - bossResult);
    } else if (targetPlayer === 2) {
      sethpP2((prev) => prev - bossResult);
    }
  };

  useEffect(() => {
    // Call handleBossAttack when the bossResult changes
    if (bossResult !== null) {
      handleBossAttack();
    }
  }, [bossResult]);

  return (
    <div>
      <h1>
        Your room id is: <strong>{id}</strong>
      </h1>
      <CharacterSelect />

      {!charSel && (
        <div>
          <Enemy />
          <div className="game-characters" key={selectedCharacter._id}>
            <div className="character-game">
              <div className="game-player">
                <div className="dice-result">
                  <p>{playerRolls[selectedCharacter._id]}</p>
                </div>
                <div className="game-3dmodel">
                  <FiberContainer />
                </div>
                <div>
                  <button onClick={open} className="game-name">{selectedCharacter.charName}</button>
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
                      value={hpP1}
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
                      <p>{(otherUser === player._id) && otherRoll}</p>
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
                          value={hpP2}
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
      <CharacterSheet/>
      <div className="wip">
                  <p>***work in progress***</p>
      </div>
    </div>
  );
}
