import { useContext, useEffect } from "react";
import { CharacterContext } from "../context/CharacterContext.jsx";
import { CharacterCreateContext } from "../context/CharacterCreateContext";
import { CreateGameContext } from "../context/CreateGameContext.jsx";
import { GameContext } from "../context/GameContext.jsx";
import "../styles/Styles.css";
import io from "socket.io-client";
const socket = io("http://localhost:3002");

export default function CharacterSelect() {
  const { characters, fetchCharacters, selected, selectedCharacter } = useContext(CharacterContext);
  const { modelSetter } = useContext(CharacterCreateContext);
  const { generatedCode } = useContext(CreateGameContext);
  const { characterSelected, charSel, handleSelectedCharacter } = useContext(GameContext);

  useEffect(() => {
    fetchCharacters();
  }, []);
  const handleSelectCharacter = (character) => {
    selected(character);
    modelSetter(character);
    characterSelected();
    // socket.emit("selectCharacter", selectedCharacter, generatedCode);
    // console.log(selectedCharacter);
  };

  return (
    charSel && (
      <div className="char-list-2">
        <p>ELIGE TU PERSONAJE</p>
        <div className="char-list-cont">
          {Array.isArray(characters) &&
            characters.map((character) => {
              return (
                <button
                  key={character._id}
                  onClick={() => handleSelectCharacter(character)}
                  className="characters-btn"
                  style={{
                    backgroundImage: `url(${require("../assets/bg-class/" +
                      character.class +
                      ".png")})`,
                  }}
                >
                  <p className="char-name-list">
                    <strong>{character.charName}</strong>
                  </p>
                  <p className="char-class-list">{character.class}</p>
                  <p className="char-level-list">Level: {character.level}</p>
                </button>
              );
            })}
        </div>
      </div>
    )
  );
}