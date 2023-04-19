import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "../context/CharacterContext.jsx";
import { CharacterCreateContext } from "../context/CharacterCreateContext";
import { CreateGameContext } from "../context/CreateGameContext.jsx";
import { GameContext } from "../context/GameContext.jsx";
import "../styles/Styles.css";

export default function CharacterSelect() {
  const [isLoading, setIsLoading] = useState(true);
  const { characters, fetchCharacters, selected } = useContext(CharacterContext);
  const { modelSetter } = useContext(CharacterCreateContext);
  const { characterSelected, charSel } = useContext(GameContext);

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
            <p className="title-char-list">Choose your Character</p>
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
