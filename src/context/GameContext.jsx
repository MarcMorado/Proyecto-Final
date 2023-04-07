import React, { useState, createContext } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [diceString, setDiceString] = useState("");
  const [result, setResult] = useState(0);
  const [error, setError] = useState("");

    const setDice = (e) =>{
        setDiceString(e);
    }

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

  const values = { result, diceString , setDice, rollDice, error };
  return (
    <GameContext.Provider value={values}>{props.children}</GameContext.Provider>
  );
};
