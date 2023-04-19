import React, { useState, createContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

export const OtherPlayersContext = createContext();

export const OtherPlayersProvider = (props) => {
  const [modelCount1, setModelCount1] = useState(1);
  const [modelo1, setModel1] = useState("");

  const modelSetter1 = useCallback((e) => {
    setModelCount1(parseInt(e.model));
  },[]);


  useEffect(() => {
    switch (modelCount1) {
      case 1:
        setModel1("warrior");
        break;
      case 2:
        setModel1("dragon");
        break;
      case 3:
        setModel1("archer");
        break;
      case 4:
        setModel1("warlock");
        break;
      case 5:
        setModel1("marauder");
        break;
      case 6:
        setModel1("barbarian");
        break;
      case 7:
        setModel1("wizard");
        break;
        default: 
        console.log('error en switch modelos');
        break;
    }
  }, [modelCount1, modelSetter1]);

  const values = {
    modelo1,
    modelSetter1,
  };

  return (
    <OtherPlayersContext.Provider value={values}>
      {props.children}
    </OtherPlayersContext.Provider>
  );
};
