import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";


export const CharacterContext = createContext();

export const CharacterProvider = (props) => {

    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [openSheet, setOpenSheet] = useState(false);

    const navigate = useNavigate();
    const json = localStorage.getItem("characters");
    const characters= JSON.parse(json);
  
    const toCharacterCreation = () =>navigate('/new-char');
  
    const selected=(e)=>{
        setSelectedCharacter(e);
        setOpenSheet(true);
    }

    const setStatPlus = (statName) => {
  setSelectedCharacter((prevCharacter) => ({
    ...prevCharacter,
    stats: {
      ...prevCharacter.stats,
      [statName]: prevCharacter.stats[statName] + 1,
    },
  }));
};
const setStatMinus = (statName) => {
  setSelectedCharacter((prevCharacter) => ({
    ...prevCharacter,
    stats: {
      ...prevCharacter.stats,
      [statName]: prevCharacter.stats[statName] - 1,
    },
  }));
};

  const values = {
    characters,
    selectedCharacter,
    openSheet,
    toCharacterCreation,
    selected,
    setStatPlus,
    setStatMinus
  };
  return (
    <CharacterContext.Provider value={values}>
      {props.children}
    </CharacterContext.Provider>
  );
};
