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
    // setSelectedWeapon(weapon);
    props.setSelectedWeapon(weapon);
  };

  const deleteWeapon = () => {
    setSelectedWeapon(null)
  }

  return (
    <div className="weapon-select">
      {selectedWeapon ? (
        <div>
          <div>
          <p><strong>Name: </strong>{selectedWeapon.name}</p>
          {selectedWeapon.damage ? (
            <p><strong>Damage: </strong>{selectedWeapon.damage}</p>
          ): null}
          {selectedWeapon.damageType ? (
            <p><strong>Damage Type: </strong>{selectedWeapon.damageType}</p>
          ): null}
          {selectedWeapon.weight ? (
            <p><strong>Weight: </strong>{selectedWeapon.weight}</p>
          ): null}
          {selectedWeapon.properties ? (
            <p><strong>properties: </strong>{selectedWeapon.properties}</p>
          ): null}
          </div>
          <div>
          <button onClick={deleteWeapon}>x</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Weapon Selector</h2>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">--Choose a category--</option>
            {Object.keys(data).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {selectedCategory && (
            <div>
              <select id="weapon" onChange={handleWeaponChange}>
                <option value="">--Choose a weapon--</option>
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
