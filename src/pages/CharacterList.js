import { useContext } from "react";
import CharacterSheet from "../components/CharacterSheet";
import { CharacterContext } from "../context/CharacterContext.jsx";
import { CharacterCreateContext } from "../context/CharacterCreateContext";
import "../styles/Styles.css";
import { FiberContainer } from "../three/FiberContainer";

export default function CharacterList() {
  const { characters, toCharacterCreation } = useContext(CharacterContext);
  const { modelSetter, modelo } = useContext(CharacterCreateContext);
  const { selected } = useContext(CharacterContext);

  const handleSelectCharacter = (character) => {
    selected(character);
    modelSetter(character);
    console.log(character.model);
  };

  return (
    <div className="char-list">
      <p>Character List</p>
      <div className="char-list-cont">
      {Array.isArray(characters) && 
        characters.map((character) => {
          return (
            <button
              key={character.name}
              onClick={() => handleSelectCharacter(character)}
              className="characters-btn"
              style={{backgroundImage:`url(${require('../assets/bg-class/' + character.class + '.png')})`}}
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
            <CharacterSheet/>
      <button className="new-char" onClick={toCharacterCreation}>CreaTe a new CharacTer</button>
    </div>
  );
}
