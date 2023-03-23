import React, { useState } from "react";
import data from "../data/weapons.json";
import "../styles/styleItems.css"

function WeaponSelector() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedWeapon(null);
  };

  const handleWeaponChange = (event) => {
    const weapon = JSON.parse(event.target.value);
    setSelectedWeapon(weapon);
  };

  const deleteWeapon = () => {
    setSelectedWeapon(null)
  }

  return (
    <div className="weapon-select">
      {selectedWeapon ? (
        <div>
          <div>
          <p>Name: {selectedWeapon.name}</p>
          <p>Damage: {selectedWeapon.damage}</p>
          <p>Damage Type: {selectedWeapon.damageType}</p>
          </div>
          <div>
          <button onClick={deleteWeapon}>x</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Weapon Selector</h2>
          <label htmlFor="category">Select a category:</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">--Please choose a category--</option>
            {Object.keys(data).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {selectedCategory && (
            <div>
              <label htmlFor="weapon">Select a weapon:</label>
              <select id="weapon" onChange={handleWeaponChange}>
                <option value="">--Please choose a weapon--</option>
                {data[selectedCategory].map((weapon) => (
                  <option key={weapon.name} value={JSON.stringify(weapon)}>
                    {weapon.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeaponSelector;
