import { useEffect, useState, useContext } from "react";
import { FiberContainer1 } from "../three/FiberContainer";
import { useNavigate } from "react-router-dom";

//? JSON
import Races from "../data/race.json";
import Clases from "../data/class.json";

//? ITEM COMPONENT
import WeaponSelector from "../components/WeaponSelector";
import ArmorSelector from "../components/ArmorSelector";

//?CONTEXT
import { WeaponContext } from "../context/WeaponContext";
import { ArmorContext } from "../context/ArmorContext";
import { CharacterCreateContext } from "../context/CharacterCreateContext";

//? DROPDOWN
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//? SERVICES
import * as charService from "../services/character.service";

//? CUSTOM CSS
import "../styles/Styles.css";

//? ARRAYS
const racesMenu = ["Elf", "Human", "Dragonborn"];
const classMenu = ["Barbarian", "Rogue", "Sorcerer"];

//? FUNCTION
export default function CharCreation() {
  //*CHARACTER CONTEXT
  const { minus, plus, modelCount } = useContext(CharacterCreateContext);
  const userId = localStorage.getItem("userId");

  //* ITEMS CONTEXT

  const { selectedWeapon } = useContext(WeaponContext);
  const { selectedArmor } = useContext(ArmorContext);

  //* Expand features
  const [expandedFeature, setExpandedFeature] = useState(null);

  //* ITEMS
  const [weaponSelectors, setWeaponSelectors] = useState([]);
  const [armorSelectors, setArmorSelectors] = useState([]);
  const [weaponAdded, setWeaponAdded] = useState(false);
  const [armorAdded, setArmorAdded] = useState(false);

  //* Character details
  const [name, setName] = useState("");
  const [clase, setClase] = useState("Barbarian");
  const [level, setLevel] = useState(1);
  const [background, setBackground] = useState("");
  const [race, setRace] = useState("Human");
  const [alignment, setAlignment] = useState("");
  const [experience, setExperience] = useState(0);

  //* Health
  const [health, setHealth] = useState(0);
  const [initiative, setInitiative] = useState(0);
  const [armor, setArmor] = useState(0);
  const [speed, setSpeed] = useState(0);

  //* Skills
  const [acrobatics, setAcrobatics] = useState(0);
  const [animalHandling, setAnimalHandling] = useState(0);
  const [arcana, setArcana] = useState(0);
  const [athletics, setAthletics] = useState(0);
  const [deception, setDeception] = useState(0);
  const [history, setHistory] = useState(0);
  const [insight, setInsight] = useState(0);
  const [intimidation, setIntimidation] = useState(0);
  const [investigation, setInvestigation] = useState(0);
  const [medicine, setMedicine] = useState(0);
  const [nature, setNature] = useState(0);
  const [perception, setPerception] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [persuasion, setPersuasion] = useState(0);
  const [religion, setReligion] = useState(0);
  const [sleightOfHands, setSleightOfHands] = useState(0);
  const [stealth, setStealth] = useState(0);
  const [survival, setSurvival] = useState(0);

  //* Character STATS
  const [str, setStr] = useState(10);
  const [dex, setDex] = useState(10);
  const [cons, setCons] = useState(10);
  const [int, setInt] = useState(10);
  const [wis, setWis] = useState(10);
  const [char, setChar] = useState(10);
  const [inspiration, setInspiration] = useState(0);
  const [profBonus, setProfBonus] = useState(0);

  //* Saving throws
  const [savingStr, setSavingStr] = useState(0);
  const [savingDex, setSavingDex] = useState(0);
  const [savingCon, setSavingCon] = useState(0);
  const [savingInt, setSavingInt] = useState(0);
  const [savingWis, setSavingWis] = useState(0);
  const [savingCha, setSavingCha] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setAcrobatics(Math.floor((dex - 10) / 2));
    setAnimalHandling(Math.floor((wis - 10) / 2));
    setArcana(Math.floor((int - 10) / 2));
    setAthletics(Math.floor((str - 10) / 2));
    setDeception(Math.floor((char - 10) / 2));
    setHistory(Math.floor((int - 10) / 2));
    setInsight(Math.floor((wis - 10) / 2));
    setIntimidation(Math.floor((char - 10) / 2));
    setInvestigation(Math.floor((int - 10) / 2));
    setMedicine(Math.floor((wis - 10) / 2));
    setNature(Math.floor((int - 10) / 2));
    setPerception(Math.floor((wis - 10) / 2));
    setPerformance(Math.floor((char - 10) / 2));
    setPersuasion(Math.floor((char - 10) / 2));
    setReligion(Math.floor((int - 10) / 2));
    setSleightOfHands(Math.floor((dex - 10) / 2));
    setStealth(Math.floor((dex - 10) / 2));
    setSurvival(Math.floor((wis - 10) / 2));

    setSavingStr(Math.floor((str - 10) / 2 + level));
    setSavingDex(Math.floor((dex - 10) / 2 + level));
    setSavingCon(Math.floor((cons - 10) / 2 + level));
    setSavingInt(Math.floor((int - 10) / 2 + level));
    setSavingWis(Math.floor((wis - 10) / 2 + level));
    setSavingCha(Math.floor((char - 10) / 2 + level));
  });

  //* RACE UPDATE
  useEffect(() => {
    if (race !== undefined) {
      setStr(Races[race].bonus.str);
      setDex(Races[race].bonus.dex);
      setCons(Races[race].bonus.cons);
      setInt(Races[race].bonus.int);
      setWis(Races[race].bonus.wis);
      setChar(Races[race].bonus.char);

      setSpeed(Races[race].speed);
    }
  }, [race]);

  //* CLASS UPDATE
  useEffect(() => {
    if (clase !== undefined) {
      setHealth(Clases[clase].hitPoints);
    }
  }, [clase]);

  //* LEVELING
  const levelUp = (e) => {
    setLevel(parseInt(e.target.value));
    if (clase !== undefined) {
      setHealth(Math.floor(health + Math.random() * Clases[clase].hitDice));
    }
  };

  //* FEATURE LIST
  const featuresList = Object.keys(Clases[clase].features).map((featureKey) => {
    const feature = Clases[clase].features[featureKey];
    const isExpanded = expandedFeature === featureKey;

    return (
      <li key={featureKey}>
        <button
          onClick={() => setExpandedFeature(isExpanded ? null : featureKey)}
        >
          <strong> {feature.name}:</strong>
        </button>
        {isExpanded && <p>{feature.description}</p>}
      </li>
    );
  });
  const addWeapon = () => {
    setWeaponAdded(true);
    setWeaponSelectors([...weaponSelectors, <WeaponSelector />]);
  };

  const addArmor = () => {
    setArmorAdded(true);
    setArmorSelectors([...armorSelectors, <ArmorSelector />]);
  };

  useEffect(() => {
    if (selectedArmor !== null) {
      setArmor(selectedArmor.aC);
    }
  }, [selectedArmor]);

  const saveChar = async () => {
    const character = {
      userId: userId,
      model: modelCount,
      charName: name,
      race: race,
      class: clase,
      level: level,
      background: background,
      alignment: alignment,
      expPoints: experience,
      armorClass: armor,
      initiative: initiative,
      speed: speed,
      hitPoints: health,
      inspiration: inspiration,
      proficiencyBonus: profBonus,
      equipment: {
        armor: selectedArmor,
        weapon: selectedWeapon,
      },
      stats: {
        str: str,
        dex: dex,
        const: cons,
        int: int,
        wis: wis,
        char: char,
      },
      savingThrows: {
        str: savingStr,
        dex: savingDex,
        const: savingCon,
        int: savingInt,
        wis: savingWis,
        char: savingCha,
      },
      skills: {
        acrobatics: acrobatics,
        animalHandling: animalHandling,
        arcana: arcana,
        athletics: athletics,
        deception: deception,
        history: history,
        insight: insight,
        intimidation: intimidation,
        investigation: investigation,
        medicine: medicine,
        nature: nature,
        perception: perception,
        performance: performance,
        persuasion: persuasion,
        religion: religion,
        sleightOfHands: sleightOfHands,
        stealth: stealth,
        survival: survival,
      },
    };
    //? funcion que manda characters al server, pasando por el charService
    charService.createChar(character);
    navigate("/my-characters");
  };
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };
  const tabsData = [
    {
      label: "ITEMS",
      content: (
        <div className="defenses-container">
          <div>
            {!weaponAdded && <button onClick={addWeapon}>Add weapon</button>}
            {weaponSelectors.map((weaponSelector, index) => (
              <div key={index}>{weaponSelector}</div>
            ))}
          </div>
          <div>
            {!armorAdded && <button onClick={addArmor}>Add armor</button>}
            {armorSelectors.map((armorSelector, index) => (
              <div key={index}>{armorSelector}</div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "FEATURES",
      content: (
        <div className="items">
          <div className="features">
            <div className="features-title">
              <div>
                <h2>{clase} Features:</h2>
                <ul>{featuresList}</ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div data-theme="autumn">
      <div className="charSheet">
        <div className="charDets">
          <div className="char-display">
            <input
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            ></input>
            <div className="char-model-container">
              <div className="char-model">
                <FiberContainer1 />
              </div>
              <div className="model-selector">
                <button onClick={minus}>Back</button>
                <button onClick={plus}>next</button>
              </div>
            </div>
          </div>
          <div className="char-dets-bg">
            <div className="char-details">
              <div className="chr-dets-spacing">
                <p>Class</p>
                <Dropdown
                  value={clase}
                  onChange={(e) => setClase(e.value)}
                  options={classMenu}
                  placeholder="Select class"
                  className="w-full md:w-14rem mydrop"
                />
              </div>
              <div className="chr-dets-spacing">
                <p>Race</p>
                <Dropdown
                  value={race}
                  onChange={(e) => setRace(e.value)}
                  options={racesMenu}
                  placeholder="Select race"
                  className="w-full md:w-14rem mydrop"
                />
              </div>
              <div>
                <p>Background</p>
                <input
                  type="text"
                  name="background"
                  value={background}
                  required
                  onChange={(e) => setBackground(e.target.value)}
                ></input>
              </div>
              <div>
                <p>Level</p>
                <input
                  type="number"
                  name="level"
                  value={level}
                  required
                  onChange={levelUp}
                ></input>
              </div>
              <div>
                <p>Alignment</p>
                <input
                  type="text"
                  name="alignment"
                  value={alignment}
                  required
                  onChange={(e) => setAlignment(e.target.value)}
                ></input>
              </div>
              <div>
                <p>Experience</p>
                <input
                  type="text"
                  name="experience"
                  value={experience}
                  required
                  onChange={(e) => setExperience(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
        </div>
        {/* STATS */}
        <div className="stats-character">
          <div className="main-stats">
            {/* STRENGTH */}
            <div className="ability-sumary">
              <div className="ability-name">
                <span>strength</span>
              </div>
              <div className="ability-score">
                <h1>{str}</h1>
              </div>
              <div className="ability-controls">
                <button onClick={() => setStr(str - 1)}>
                  <p>-</p>
                </button>
                <div className="ability-modifier">
                  <h3>{Math.floor((str - 10) / 2)}</h3>
                </div>
                <button onClick={() => setStr(str + 1)}>
                  <p>+</p>
                </button>
              </div>
            </div>
            {/* DEXTERITY */}
            <div className="ability-sumary">
              <div className="ability-name">
                <span>dexterity</span>
              </div>
              <div className="ability-score">
                <h1>{dex}</h1>
              </div>
              <div className="ability-controls">
                <button onClick={() => setDex(dex - 1)}>
                  <p>-</p>
                </button>
                <div className="ability-modifier">
                  <h3>{Math.floor((dex - 10) / 2)}</h3>
                </div>
                <button onClick={() => setDex(dex + 1)}>
                  <p>+</p>
                </button>
              </div>
            </div>
            {/* CONSTITUTION */}
            <div className="ability-sumary">
              <div className="ability-name">
                <span>constitution</span>
              </div>
              <div className="ability-score">
                <h1>{cons}</h1>
              </div>
              <div className="ability-controls">
                <button onClick={() => setCons(cons - 1)}>
                  <p>-</p>
                </button>
                <div className="ability-modifier">
                  <h3>{Math.floor((cons - 10) / 2)}</h3>
                </div>
                <button onClick={() => setCons(cons + 1)}>
                  <p>+</p>
                </button>
              </div>
            </div>
            {/* INTELLIGENCE */}
            <div className="ability-sumary">
              <div className="ability-name">
                <span>intelligence</span>
              </div>
              <div className="ability-score">
                <h1>{int}</h1>
              </div>
              <div className="ability-controls">
                <button onClick={() => setInt(int - 1)}>
                  <p>-</p>
                </button>
                <div className="ability-modifier">
                  <h3>{Math.floor((int - 10) / 2)}</h3>
                </div>
                <button onClick={() => setInt(int + 1)}>
                  <p>+</p>
                </button>
              </div>
            </div>
            {/* WISDOM */}
            <div className="ability-sumary">
              <div className="ability-name">
                <span>wisdom</span>
              </div>
              <div className="ability-score">
                <h1>{wis}</h1>
              </div>
              <div className="ability-controls">
                <button onClick={() => setWis(wis - 1)}>
                  <p>-</p>
                </button>
                <div className="ability-modifier">
                  <h3>{Math.floor((wis - 10) / 2)}</h3>
                </div>
                <button onClick={() => setWis(wis + 1)}>
                  <p>+</p>
                </button>
              </div>
            </div>
            {/* CHARISMA */}
            <div className="ability-sumary">
              <div className="ability-name">
                <span>charisma</span>
              </div>
              <div className="ability-score">
                <h1>{char}</h1>
              </div>
              <div className="ability-controls">
                <button onClick={() => setChar(char - 1)}>
                  <p>-</p>
                </button>
                <div className="ability-modifier">
                  <h3>{Math.floor((char - 10) / 2)}</h3>
                </div>
                <button onClick={() => setChar(char + 1)}>
                  <p>+</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* SKILLS */}
        <div className="skills">
          <div className="skills-container">
            <div className="skills-titles">
              <div className="skills-titles-left">
                <div className="skills-titles-prof">
                  <p>prof</p>
                </div>
                <div className="skills-titles-mod">
                  <p>mod</p>
                </div>
                <div className="skills-titles-skill">
                  <p>skill</p>
                </div>
              </div>
              <div className="skills-titles-right">
                <div>
                  <p>bonus</p>
                </div>
              </div>
            </div>
            <div className="skills-list">
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">dex</div>
                <div className="skill-name">Acrobatics</div>
                <div className="skill-mod">{acrobatics}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">wis</div>
                <div className="skill-name">Animal Handling</div>
                <div className="skill-mod">{animalHandling}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">int</div>
                <div className="skill-name">Arcana</div>
                <div className="skill-mod">{arcana}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">str</div>
                <div className="skill-name">Athletics</div>
                <div className="skill-mod">{athletics}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">cha</div>
                <div className="skill-name">Deception</div>
                <div className="skill-mod">{deception}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">int</div>
                <div className="skill-name">History</div>
                <div className="skill-mod">{history}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">wis</div>
                <div className="skill-name">Insight</div>
                <div className="skill-mod">{insight}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">cha</div>
                <div className="skill-name">Intimidation</div>
                <div className="skill-mod">{intimidation}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">int</div>
                <div className="skill-name">Investigation</div>
                <div className="skill-mod">{investigation}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">wis</div>
                <div className="skill-name">Medicine</div>
                <div className="skill-mod">{medicine}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">int</div>
                <div className="skill-name">Nature</div>
                <div className="skill-mod">{nature}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">wis</div>
                <div className="skill-name">Perception</div>
                <div className="skill-mod">{perception}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">cha</div>
                <div className="skill-name">Performance</div>
                <div className="skill-mod">{performance}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">cha</div>
                <div className="skill-name">Persuasion</div>
                <div className="skill-mod">{persuasion}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">int</div>
                <div className="skill-name">Religion</div>
                <div className="skill-mod">{religion}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">dex</div>
                <div className="skill-name">Sleight of hands</div>
                <div className="skill-mod">{sleightOfHands}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">dex</div>
                <div className="skill-name">Stealth</div>
                <div className="skill-mod">{stealth}</div>
              </div>
              <div className="skill">
                <input type="checkbox" className="checkbox checkbox-xs"></input>
                <div className="skill-mod">wis</div>
                <div className="skill-name">Survival</div>
                <div className="skill-mod">{survival}</div>
              </div>
              <div className="skill-main-title">
                <p>skills</p>
              </div>
            </div>
          </div>
        </div>
        {/* SAVING THROWS */}
        <div className="saving">
          <div className="saving-throws">
            <div className="throw">
              <div className="thow-div">
                <div>
                  <p>str</p>
                </div>
                <div className="throw-stat">+{savingStr}</div>
              </div>
            </div>
            <div className="throw">
              <div className="thow-div">
                <div>
                  <p>dex</p>
                </div>
                <div className="throw-stat">+{savingDex}</div>
              </div>
            </div>
            <div className="throw">
              <div className="thow-div">
                <div>
                  <p>cons</p>
                </div>
                <div className="throw-stat">+{savingCon}</div>
              </div>
            </div>
            <div className="throw">
              <div className="thow-div">
                <div>
                  <p>int</p>
                </div>
                <div className="throw-stat">+{savingInt}</div>
              </div>
            </div>
            <div className="throw">
              <div className="thow-div">
                <div>
                  <p>wis</p>
                </div>
                <div className="throw-stat">+{savingWis}</div>
              </div>
            </div>
            <div className="throw">
              <div className="thow-div">
                <div>
                  <p>cha</p>
                </div>
                <div className="throw-stat">+{savingCha}</div>
              </div>
            </div>
          </div>
        </div>
        {/* SENSES */}
        <div className="senses">
          <div>
            <p>{Races[race].features}</p>
            <p>Speed: {Races[race].speed} feet</p>
          </div>
        </div>
        <div className="char-other">
          {/* HEALTH */}
          <div className="other">
            <div className="health-main">
              <div className="health-title">
                <p>health</p>
              </div>
              <div className="health-score">
                <p className="other-value">{health}</p>
              </div>
            </div>
          </div>
          {/* INITIATIVE */}
          <div className="other">
            <div className="initiative-title">
              <p>initiative</p>
            </div>
            <div className="initiative-score">
              <input
                type="number"
                defaultValue={initiative}
                name="initiative"
                onChange={(e)=> setInitiative(e.target.value)}
              ></input>
            </div>
          </div>
          {/* ARMOR */}
          <div className="other">
            <div className="armor-score">
              <p>Armor</p>
              <p className="other-value">{armor}</p>
            </div>
          </div>
          {/* PROFICIENCY */}
          <div className="other">
            <div className="prof-bonus">
              <p className="prof-title">proficiency</p>
              <p className="other-value">{profBonus}</p>
              <p className="prof-title">bonus</p>
            </div>
          </div>
          {/* INSPIRATION */}
          <div className="other">
            <div className="inspiration">
              <p className="inspiration-title">inspiration</p>
              <p className="other-value">{inspiration}</p>
            </div>
          </div>
        </div>
        <div className="items-feats">
          <div className="tabs-feats">
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
          <div className="tab-content">{tabsData[activeTabIndex].content}</div>
        </div>
      </div>
      <div>
      <button className="save-btn" onClick={saveChar}>Save CharacTer</button>
      </div>
      <div className="foot"></div>
    </div>
  );
}
