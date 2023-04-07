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

export default function Game() {
  const { result, diceString, setDice, rollDice, error } =
    useContext(GameContext);
  const { id } = useParams();
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
        </div>
        <div></div>
      </div>
    </div>
  );
}
