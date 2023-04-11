import React, { useState, createContext } from "react";
import { CharacterContext } from "./CharacterContext";
import { CreateGameContext } from "./CreateGameContext";
import { useContext } from "react";
import { useEffect } from "react";


export const GameContext = createContext();

export const GameProvider = (props) => {
  const { selectedCharacter } = useContext(CharacterContext);
  const { handlePlayerJoinGame, handleMasterJoinGame } =
    useContext(CreateGameContext);
  const [diceString, setDiceString] = useState("");
  const [result, setResult] = useState(0);
  const [error, setError] = useState("");
  const [charSel, setCharSel] = useState(true);
  useEffect(() => {
    setCharSel(true);
  }, [handlePlayerJoinGame, handleMasterJoinGame]);

  const setDice = (e) => {
    setDiceString(e.target.value);
  };
  const characterSelected = () => {
    setCharSel(false);
  };


  


  function rollDice() {
    const diceMatch = diceString.match(/^(\d+)d(\d+)$/);
    if (!diceMatch) {
      setError("Invalid dice format. Please use format 'NdM'");
      return;
    }
    const [numDice, numFaces] = diceMatch.slice(1).map(Number);
    let total = 0;
    for (let i = 0; i < numDice; i++) {
      total += Math.floor(Math.random() * numFaces) + 1;
    }
    setResult(total);
    setError("");
  }
  function rollDiceWeapon() {
    const diceMatch = selectedCharacter.equipment.weapon.damage.match(/^(\d+)d(\d+)$/);
    if (!diceMatch) {
      setError("Invalid dice format. Please use format 'NdM'");
      return;
    }
    const [numDice, numFaces] = diceMatch.slice(1).map(Number);
    let total = 0;
    for (let i = 0; i < numDice; i++) {
      total += Math.floor(Math.random() * numFaces) + 1;
    }
    setResult(total);
    setError("");
  }

  const values = {
    result,
    diceString,
    setDice,
    rollDice,
    error,
    selectedCharacter,
    characterSelected,
    charSel,
    rollDiceWeapon
    
  };
  return (
    <GameContext.Provider value={values}>{props.children}</GameContext.Provider>
  );
};
