import { useContext, useEffect } from "react";
import CharacterSheet from "../components/CharacterSheet";
import { CharacterContext } from "../context/CharacterContext.jsx";
import { CharacterCreateContext } from "../context/CharacterCreateContext";
import "../styles/Styles.css";

export default function CharacterList() {
  const { characters, toCharacterCreation, fetchCharacters } = useContext(CharacterContext);
  const { modelSetter } = useContext(CharacterCreateContext);
  const { selected } = useContext(CharacterContext);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSelectCharacter = (character) => {
    selected(character);
    modelSetter(character);
  };  

  return (
    <div className="char-list">
      <p>Character List</p>
      <div className="char-list-cont">
      {Array.isArray(characters) && 
        characters.map((character) => {
          return (
            <button
              key={character._id}
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
