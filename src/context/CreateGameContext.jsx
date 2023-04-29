import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
const socket = io("http://sanctum.up.railway.app:3002");
export const CreateGameContext = createContext();

export const CreateGameProvider = (props) => {
  const navigate = useNavigate();
  const [generatedCode, setGeneratedCode] = useState("");
  const [playerJoin, setPlayerJoin] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [showFloatingMessage, setShowFloatingMessage] = useState(false);

  const handleCreateGame = async () => {
    const newRoomCode = Math.random().toString(36).substr(2, 5);
    setGeneratedCode(newRoomCode);
    await axios.post("http://sanctum.up.railway.app/createRoom", {
      roomCode: generatedCode,
    });
    socket.emit("joinRoom",generatedCode);
    navigate(`/game/${generatedCode}`);
  };
  

  const handleJoinGame = () => {
    setPlayerJoin(true);
  };
  const handlePlayerJoinGame = () => {
    let roomCodeLower = roomCode.toLowerCase();
    socket.emit("joinRoom",roomCodeLower);
    navigate(`/game/${roomCodeLower}`);
  };

  const handleMasterJoinGame = () => {
    navigate(`/game/${generatedCode}`);
  };

  const roomCodeInput = (e) => {
    setRoomCode(e.target.value);
  };

  socket.on("roomFull", () => {
    setShowFloatingMessage(true);
    setTimeout(() => {
      setShowFloatingMessage(false);
      window.location.href = "/join";
    }, 5000);
  });
  
  socket.on('redirect', (location) => {
    window.location.href = location;
  });



  const values = {
    generatedCode,
    playerJoin,
    roomCode,
    handleCreateGame,
    handleJoinGame,
    handlePlayerJoinGame,
    handleMasterJoinGame,
    roomCodeInput,
  };

  return (
    <CreateGameContext.Provider value={values}>
      {props.children}
    </CreateGameContext.Provider>
  );
};
