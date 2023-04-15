import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "../context/CharacterContext.jsx";
import { CharacterCreateContext } from "../context/CharacterCreateContext";
import { CreateGameContext } from "../context/CreateGameContext.jsx";
import { GameContext } from "../context/GameContext.jsx";
import "../styles/Styles.css";

export default function CharacterSelect() {
  const [isLoading, setIsLoading] = useState(true);
  const { characters, fetchCharacters, selected, selectedCharacter } = useContext(CharacterContext);
  const { modelSetter } = useContext(CharacterCreateContext);
  const { generatedCode } = useContext(CreateGameContext);
  const { characterSelected, charSel, handleSelectedCharacter } = useContext(GameContext);

  useEffect(() => {
    setIsLoading(true);
    fetchCharacters().then(() => setIsLoading(false));
  }, []);

  const handleSelectCharacter = (character) => {
    selected(character);
    modelSetter(character);
    characterSelected();
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
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
      )}
    </div>
  );
}
