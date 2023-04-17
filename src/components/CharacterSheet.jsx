import { CharacterContext } from "../context/CharacterContext";
import { useContext, useState } from "react";
import imgBg from "../assets/sheet/bgSht.png";
import "../styles/StylesCharacter.css";
import { FiberContainer } from "../three/FiberContainer";

export default function CharacterSheet() {
  const { selectedCharacter, openSheet, setStatPlus, setStatMinus, closeSheet } =
    useContext(CharacterContext);

  const tabsData = [
    {
      label: "STATS",
      content: (
        <div className="sht-stats">
          {selectedCharacter &&
            Object.keys(selectedCharacter.stats).map((statName) => (
              <div className="sht-stat" key={statName}>
                <div className="container">
                  <div className="content">
                    <p className="text">{statName}</p>
                    <p className="stat-number">
                      {selectedCharacter.stats[statName]}
                    </p>
                    <div className="plus-minus">
                      <button
                        className="btn-minus"
                        onClick={() => setStatMinus(`${statName}`)}
                      >
                        -
                      </button>
                      <p>
                        {Math.floor(
                          (selectedCharacter.stats[statName] - 10) / 2
                        )}
                      </p>
                      <button
                        className="btn-plus"
                        onClick={() => setStatPlus(`${statName}`)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ),
    },
    {
      label: "SKILLS",
      content: (
        <div className="sht-s">
          {selectedCharacter &&
            Object.keys(selectedCharacter.skills).map((skillName) => (
              <div className="sht-skill" key={skillName}>
                <div className="s-container">
                  <div className="s-content">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs"
                    ></input>
                    <p className="s-text">{skillName}</p>
                    <p className="s-number">
                      {selectedCharacter.skills[skillName]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ),
    },
    {
      label: "ITEMS",
      content: (
        <div className="i-container">
          {selectedCharacter && (
            <div className="item-cont">
              <div className="weapon-container">
                <div>
                  <p>
                    <strong>WEAPON:</strong>
                  </p>
                </div>
                <div>
                  <div className="w-container">
                    <div className="w-content">
                      <p className="w-text">
                        {selectedCharacter.equipment.weapon.name}
                      </p>
                      <p className="w-text">
                        {selectedCharacter.equipment.weapon.damage}{" "}
                        {selectedCharacter.equipment.weapon.damageType}
                      </p>
                      <p className="w-text">
                        {selectedCharacter.equipment.weapon.weight}
                      </p>
                      <p className="w-text">
                        {selectedCharacter.equipment.weapon.properties}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="armor-cont">
                <div>
                  <p>
                    <strong>ARMOR:</strong>
                  </p>
                </div>
                <div>
                  <div className="a-container">
                    <div className="a-content">
                      <p className="a-text">
                        <strong>Name: </strong>{" "}
                        {selectedCharacter.equipment.armor.name}
                      </p>
                      <p className="a-text">
                        <strong>ARMOR CLASS: </strong>
                        {selectedCharacter.equipment.armor.aC}
                      </p>
                      <p className="a-text">
                        <strong>weight: </strong>{" "}
                        {selectedCharacter.equipment.armor.Weight}
                      </p>
                      <p >
                        <strong>description: </strong>
                        <br />
                      </p>
                      <div className="a-text-desc">{selectedCharacter.equipment.armor.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    { label: "OTHERS", content: 
    <div className="others-container">
      <p>WIP!</p>
    </div> },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  return (
    openSheet && (
      <div className="bg-sht">
        <div className="close-btn">
          <button onClick={closeSheet}>
            x
          </button>
        </div>
        
        <div className="sht-modal">
        <div className="model-container">
          <FiberContainer />
        </div>
          <div className="sht-container">
            <img src={imgBg} alt="bg" />
          </div>
          <div className="main-info">
            <div className="level-container">
              <div>
                <p className="level">{selectedCharacter.level}</p>
              </div>
            </div>
            <div className="info-container">
              <p className="prof">{selectedCharacter.proficiencyBonus}</p>
              <p className="armor-main">{selectedCharacter.armorClass}</p>
              <progress
                className="progress progress-error border border-black border-opacity-50 w-56
                h-3"
                value={selectedCharacter.hitPoints}
                max={selectedCharacter.hitPoints}
              ></progress>
              <p className="ini">{selectedCharacter.initiative}</p>
            </div>
          </div>

          <div>
            <div className="tabs">
              {tabsData.map((tab, index) => (
                <div
                  key={index}
                  className={`tab ${index === activeTabIndex ? "active" : ""}`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab.label}
                </div>
              ))}
            </div>
            <div className="tab-content">
              {tabsData[activeTabIndex].content}
            </div>
          </div>
        </div>
        
      </div>
    )
  );
}
