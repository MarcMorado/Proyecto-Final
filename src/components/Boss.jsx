import "../styles/StylesGame.css";
import { FiberContainer } from "../three/FiberContainer";
import { GameContext } from "../context/GameContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
export default function Enemy() {
  const { result } = useContext(GameContext);
  let enemy = {
    name: "Robert",
    level: 6,
    armorClass: 14,
    hitPoints: 200,
    initiative: 4,
    attack: "1d20",
  };
const [currentHps, SetCurrentHps] = useState(enemy.hitPoints)

  useEffect(() => {
    SetCurrentHps(currentHps - result)
  }, [result]);

  return (
    <div className="boss-sht">
      <div className="boss-modal">
        <div className="boss-info">
          <div className="boss-container">
            <progress
              className="progress progress-error border border-black border-opacity-50 w-96
                h-5"
              value={currentHps}
              max={enemy.hitPoints}
            ></progress>
          </div>
          <div className="boss-info-container">
            <p className="boss-armor" title="armor">
              {enemy.armorClass}
            </p>
            <p className="boss-name">
              <strong>{enemy.name}</strong> lvl:{enemy.level}
            </p>
            <p className="boss-ini" title="initiative">
              {enemy.initiative}
            </p>
          </div>
        </div>
      </div>
      <div className="boss-model-container">
        <FiberContainer />
      </div>
    </div>
  );
}
