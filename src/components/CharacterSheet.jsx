import { CharacterContext } from "../context/CharacterContext";
import { useContext } from "react";
import '../styles/StylesCharacter.css'

export default function CharacterSheet() {
  const { selectedCharacter, openSheet } = useContext(CharacterContext);

  return (
    openSheet && (
      <div>
        <div className="sheet-modal">
          <p>{selectedCharacter.charName}</p>
        </div>
      </div>
    )
  );
}
