import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateGameContext = createContext();

export const CreateGameProvider = (props) => {
    const navigate = useNavigate();
    const [generatedCode, setGeneratedCode] = useState("");
    const [playerJoin, setPlayerJoin] = useState(false);
    const [roomCode, setRoomCode] = useState("")
  
    const handleCreateGame = async () => {
      const newRoomCode = Math.random().toString(36).substr(2, 5); 
      setGeneratedCode(newRoomCode);
      await axios.post("http://localhost:3001/createRoom", { roomCode: newRoomCode }); 
      navigate(`/game/${generatedCode}`);
    };
  
    const handleJoinGame = () => {
      setPlayerJoin(true);
    };
    const handlePlayerJoinGame = () => {
      let roomCodeLower = roomCode.toLowerCase();
      navigate(`/game/${roomCodeLower}`); 
    };
  
    const handleMasterJoinGame = () => {
      navigate(`/game/${generatedCode}`); 
    };

    const roomCodeInput = (e) => {
      setRoomCode(e.target.value)
    }
  const values = {
    generatedCode,
    playerJoin,
    roomCode,
    handleCreateGame,
    handleJoinGame,
    handlePlayerJoinGame,
    handleMasterJoinGame,
    roomCodeInput
  };

  return (
    <CreateGameContext.Provider value={values}>
      {props.children}
    </CreateGameContext.Provider>
  );
};
