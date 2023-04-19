import React, { useState, createContext } from "react";
import { CharacterContext } from "./CharacterContext";
import { CreateGameContext } from "./CreateGameContext";
import { useContext } from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { OtherPlayersContext } from "./OtherPlayersContext";

const socket = io("http://localhost:3002");

export const GameContext = createContext();

export const GameProvider = (props) => {
  const navigate = useNavigate();
  const {modelSetter1} = useContext(OtherPlayersContext);
  const { selectedCharacter } = useContext(CharacterContext);
  const { handlePlayerJoinGame, handleMasterJoinGame } =
    useContext(CreateGameContext);
  const [diceString, setDiceString] = useState("");
  const [result, setResult] = useState();
  const [error, setError] = useState("");
  const [charSel, setCharSel] = useState(true);
  const [playerRolls, setPlayerRolls] = useState({});
  const [otherRoll, setOtherRoll] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [players, setPlayers] = useState([]);
  const [bossRolls, setBossRolls] = useState('')
  const [bossResult, setBossResult] = useState();
  const [hpP1, sethpP1] = useState(0);
  const [hpP2, sethpP2] = useState(0);

  useEffect(() => {
    sethpP1(selectedCharacter.hitPoints);
    if (players.length > 1) {
      sethpP2(players[1].hitPoints);
      const otherPlayer = players.find(player => player._id !== selectedCharacter._id);
      modelSetter1(otherPlayer);
    }
  }, [players]);

  const handleExitRoom = () => {
    socket.emit("exitRoom", selectedCharacter.charName);
    navigate("/");
    setPlayers(
      players.filter((player) => player._id !== selectedCharacter._id)
    );
  };
 

  useEffect(() => {
    socket.on("updatePlayers", (players) => {
      setPlayers(players);
    });
  }, []);

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
    const playerId = selectedCharacter._id;

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
    const newRolls = { ...playerRolls, [playerId]: total };
    setPlayerRolls(newRolls);
    setResult(total);
    setError("");
    const user = selectedCharacter._id;
    socket.emit("roll", { roll: result, user: user });

    socket.on("userRoll", (data) => {
      setOtherRoll(data.roll);
      setOtherUser(data.user);
    });
  }
  function bossRoll() {
    let dice = "1d6";
    const diceMatch = dice.match(/^(\d+)d(\d+)$/);
    if (!diceMatch) {
      setError("Invalid dice format. Please use format 'NdM'");
      return;
    }
    const [numDice, numFaces] = diceMatch.slice(1).map(Number);
    let total = 0;
    for (let i = 0; i < numDice; i++) {
      total += Math.floor(Math.random() * numFaces) + 1;
    }
    socket.emit("bossDiceRoll", { roll: total });
    socket.on("bossRolled", (data) => {
      setBossRolls(data.roll);
      setBossResult(data.roll);
    });
    setError("");
    handleBossAttack();
  }
  const handleBossAttack = () => {
    const targetPlayer = Math.floor(Math.random() * 2) + 1; 
    if (targetPlayer === 1) {
      sethpP1((prev) => prev - bossResult);
    } else if (targetPlayer === 2) {
      sethpP2((prev) => prev - bossResult);
    }
  };

  const values = {
    result,
    diceString,
    setDice,
    rollDice,
    error,
    selectedCharacter,
    characterSelected,
    charSel,
    bossRoll,
    playerRolls,
    otherRoll,
    otherUser,
    handleExitRoom,
    players,
    bossResult,
    bossRolls,
    hpP1,
    hpP2
    
  };
  return (
    <GameContext.Provider value={values}>{props.children}</GameContext.Provider>
  );
};
