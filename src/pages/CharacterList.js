import { useContext } from "react";
import CharacterSheet from "../components/CharacterSheet";
import { CharacterContext } from "../context/CharacterContext.jsx";
import "../styles/Styles.css";

export default function CharacterList() {
  const { characters, toCharacterCreation, openSheet } = useContext(CharacterContext);
  const { selected } = useContext(CharacterContext);

  const handleSelectCharacter = (character) => {
    selected(character);
  };

  return (
    <div>
      <p>Character List</p>
      {characters &&
        characters.map((character) => {
          return (
            <button
              key={character.name}
              onClick={() => handleSelectCharacter(character)}
              className="characters-btn"
            >
              <p>
                <strong>{character.charName}</strong>
              </p>
              <p>{character.class}</p>
              <p>Level: {character.level}</p>
            </button>
          );
        })}
            <CharacterSheet/>
      <button onClick={toCharacterCreation}>Create a new Character</button>
    </div>
  );
}
