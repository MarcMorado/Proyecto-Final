import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FiberContainer } from "../three/FiberContainer";

//? JSON
import Races from "../data/race.json";
import Clases from "../data/class.json";

//? ITEM COMPONENT
import WeaponSelector from "../components/WeaponSelector";
import ArmorSelector from "../components/ArmorSelector";

//?CONTEXT
import { WeaponContext } from "../context/WeaponContext";
import { ArmorContext } from "../context/ArmorContext";
import { GameContext } from "../context/GameContext";

//? CUSTOM CSS
import "../styles/StylesGame.css";

import io from "socket.io-client";
const socket = io("http://localhost:3002");

export default function Game() {
  const { result, diceString, setDice, rollDice, error } =
    useContext(GameContext);
  const { id } = useParams();
  const [otherRoll, setOtherRoll] = useState("");
  const [otherUser, setOtherUser] = useState("");

  useEffect(() => {
    const user = new Date();
    socket.emit("roll", { roll: result, user: user });

    socket.on("userRoll", data => {
      console.log("hola");
      setOtherRoll(data.roll);
      setOtherUser(data.user);
    });

    socket.emit("newWeapon", { name: "Crossbow", damage: "1d10" });
  }, [result, rollDice]);

  return (
    <div>
      <div>
        <h1>
          Your room id is: <strong>{id}</strong>
        </h1>
      </div>
      <div>
        <div className="inp-dice">
          <input
            type="text"
            name="dice"
            value={diceString}
            required
            onChange={setDice}
            placeholder="dice"
          ></input>
          <button onClick={rollDice}>Roll</button>
          <p>{result}</p>
          <p>{error}</p>
          <p>{otherRoll && `Other Roll: ${otherRoll}`}</p>
          <p>{otherUser && `Other User: ${otherUser}`}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
