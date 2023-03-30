import { CharacterContext } from "../context/CharacterContext";
import { useContext, useState } from "react";
import imgBg from "../assets/sheet/bgSht.png";
import "../styles/StylesCharacter.css";

export default function CharacterSheet() {
  const { selectedCharacter, openSheet, setStatPlus, setStatMinus } =
    useContext(CharacterContext);

  const tabsData = [
    {
      label: "Stats",
      content: ( 
        <div className="sht-stats">
          {selectedCharacter && Object.keys(selectedCharacter.stats).map((statName) => (
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
                      {Math.floor((selectedCharacter.stats[statName] - 10) / 2)}
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
    { label: "Skills", content: <div>Skills tab content</div> },
    { label: "Items", content: <div>Items tab content</div> },
    { label: "Others", content: <div>Others tab content</div> },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  return (
    openSheet && (
      <div className="bg-sht">
        <div className="sht-modal">
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
