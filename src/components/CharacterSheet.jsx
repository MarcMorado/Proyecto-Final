import { CharacterContext } from "../context/CharacterContext";
import { useContext } from "react";
import imgBg from "../assets/sheet/asdddd26.png";
import imgStat from "../assets/sheet/stat.png";
import "../styles/StylesCharacter.css";

export default function CharacterSheet() {
  const { selectedCharacter, openSheet } = useContext(CharacterContext);

  return (
    openSheet && (
      <div className="bg-sht">
        <div className="sht-modal">
          <div className="sht-container">
            <img src={imgBg} alt="bg" />
          </div>
          <div className="sht-stats">
            <div className="sht-stat">
              <div className="container">
                <div className="content">
                  <p className="text">str</p>
                  <p className="stat-number">{selectedCharacter.stats.str}</p>
                  <div className="plus-minus">
                    <button className="btn-minus">-</button>
                    <p>{Math.floor((selectedCharacter.stats.str - 10) / 2)}</p>
                    <button className="btn-plus">+</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="sht-stat">
              <div className="container">
                <div className="content">
                  <p className="text">dex</p>
                  <p className="stat-number">{selectedCharacter.stats.dex}</p>
                  <div className="plus-minus">
                    <button className="btn-minus">-</button>
                    <p>{Math.floor((selectedCharacter.stats.dex - 10) / 2)}</p>
                    <button className="btn-plus">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sht-stat">
              <div className="container">
                <div className="content">
                  <p className="text">cons</p>
                  <p className="stat-number">{selectedCharacter.stats.const}</p>
                  <div className="plus-minus">
                    <button className="btn-minus">-</button>
                    <p>{Math.floor((selectedCharacter.stats.const - 10) / 2)}</p>
                    <button className="btn-plus">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sht-stat">
              <div className="container">
                <div className="content">
                  <p className="text">int</p>
                  <p className="stat-number">{selectedCharacter.stats.int}</p>
                  <div className="plus-minus">
                    <button className="btn-minus">-</button>
                    <p>{Math.floor((selectedCharacter.stats.int - 10) / 2)}</p>
                    <button className="btn-plus">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sht-stat">
              <div className="container">
                <div className="content">
                  <p className="text">wis</p>
                  <p className="stat-number">{selectedCharacter.stats.wis}</p>
                  <div className="plus-minus">
                    <button className="btn-minus">-</button>
                    <p>{Math.floor((selectedCharacter.stats.wis - 10) / 2)}</p>
                    <button className="btn-plus">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sht-stat">
              <div className="container">
                <div className="content">
                  <p className="text">char</p>
                  <p className="stat-number">{selectedCharacter.stats.char}</p>
                  <div className="plus-minus">
                    <button className="btn-minus">-</button>
                    <p>{Math.floor((selectedCharacter.stats.char - 10) / 2)}</p>
                    <button className="btn-plus">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
