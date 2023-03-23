import React, { useState } from "react";
import weaponsJSON from "../data/weapons.json";

function WeaponSelector() {
  const [category, setCategory] = useState(null);
  const [weapon, setWeapon] = useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setWeapon(null); // reset weapon selection when changing category
  };

  const handleWeaponChange = (event) => {
    setWeapon(event.target.value);
  };

  const weaponsInCategory = weaponsJSON.filter(
    (weapon) => weapon.category === category
  );

  return (
    <div>
      <h2>Weapon Selector</h2>
      <div>
        <label htmlFor="category-select">Category:</label>
        <select
          id="category-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          <option value="simpleMelee">Simple Melee</option>
          <option value="simpleRanged">Simple Ranged</option>
          <option value="martialMelee">Martial Melee</option>
          <option value="martialRanged">Martial Ranged</option>
        </select>
      </div>
      {category && (
        <div>
          <label htmlFor="weapon-select">Weapon:</label>
          <select
            id="weapon-select"
            value={weapon}
            onChange={handleWeaponChange}
          >
            <option value="">Select a weapon</option>
            {weaponsInCategory.map((weapon) => (
              <option key={weapon.name} value={weapon.name}>
                {weapon.name} ({weapon.damage})
              </option>
            ))}
          </select>
        </div>
      )}
      {weapon && (
        <div>
          <p>Selected weapon: {weapon}</p>
          <p>Damage: {weaponsJSON.find(w => w.name === weapon).damage}</p>
        </div>
      )}
    </div>
  );
}

export default WeaponSelector;
