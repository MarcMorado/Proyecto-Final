import React, { useState, createContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

export const CharacterCreateContext = createContext();

export const CharacterCreateProvider = (props) => {
  const [modelCount, setModelCount] = useState(1);
  const [modelo, setModel] = useState("");
  const [userId, setUserId] = useState("");

  const saveId = (e) => {
    setUserId(e);
    localStorage.setItem('userId', JSON.stringify(userId));
  };
  const minus = () => {
    if (modelCount > 1) setModelCount(modelCount - 1);
  };
  const plus = () => {
    if (modelCount < 7) setModelCount(modelCount + 1);
    console.log('delante');
  };
  const modelSetter = useCallback((e) => {
    setModelCount(parseInt(e.model));
    console.log('el modelo seleccionado es =>', e.model); 
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
    minus,
    plus,
    modelSetter,
    userId,
    saveId
  };

  return (
    <CharacterCreateContext.Provider value={values}>
      {props.children}
    </CharacterCreateContext.Provider>
  );
};
