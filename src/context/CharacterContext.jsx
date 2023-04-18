import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:3002");
export const CharacterContext = createContext();

export const CharacterProvider = (props) => {
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [openSheet, setOpenSheet] = useState(false);
  const [characters, setCharacters] = useState();
  const [selectedTimeout, setSelectedTimeout] = useState(null);
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const toCharacterCreation = () => navigate("/new-char");

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/characters/${userId}`);
      setCharacters(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/characters/${userId}`)
  //     .then((response) => {
  //       setCharacters(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [userId]);

const selected = (e) => {
  if (e !== selectedCharacter) {
    setSelectedCharacter(e);
    setOpenSheet(true);
    if (selectedTimeout) {
      clearTimeout(selectedTimeout);
    }
    setSelectedTimeout(
      setTimeout(() => {
        socket.emit("selectCharacter", e);
      }, 2000)
    );
  }
};

  const open = () =>{
    setOpenSheet(true);
  }

  const closeSheet = () => {
    setOpenSheet(false);
  };

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
    setStatMinus,
    closeSheet,
    fetchCharacters,
    open
  };
  return (
    <CharacterContext.Provider value={values}>
      {props.children}
    </CharacterContext.Provider>
  );
};
