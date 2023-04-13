import React, { useState, createContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

export const otherPlayersContext = createContext();

export const CharacterCreateProvider = (props) => {
  const [modelCount, setModelCount] = useState(1);
  const [modelo, setModel] = useState("");

  const modelSetter = useCallback((e) => {
    setModelCount(parseInt(e.model));
  },[]);


  useEffect(() => {
    switch (modelCount) {
      case 1:
        setModel("warrior");
        break;
      case 2:
        setModel("dragon");
        break;
      case 3:
        setModel("archer");
        break;
      case 4:
        setModel("warlock");
        break;
      case 5:
        setModel("marauder");
        break;
      case 6:
        setModel("barbarian");
        break;
      case 7:
        setModel("wizard");
        break;
        default: 
        console.log('error en switch modelos');
        break;
    }
  }, [modelCount, modelSetter]);

  const values = {
    modelCount,
    modelo,
    modelSetter,
  };

  return (
    <otherPlayersContext.Provider value={values}>
      {props.children}
    </otherPlayersContext.Provider>
  );
};
