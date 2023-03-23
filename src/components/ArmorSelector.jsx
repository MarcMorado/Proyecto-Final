import React, { useState } from "react";
import data from "../data/armor.json";
import "../styles/styleItems.css"

function ArmorSelector() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArmor, setSelectedArmor] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedArmor(null);
  };

  const handleArmorChange = (event) => {
    const armor = JSON.parse(event.target.value);
    setSelectedArmor(armor);
  };

  const deleteArmor = () => {
    setSelectedArmor(null)
  }

  return (
    <div className="armor-select">
      {selectedArmor ? (
        <div>
          <div>
          <p>Name: {selectedArmor.name}</p>
          <p>Damage: {selectedArmor.damage}</p>
          <p>Damage Type: {selectedArmor.damageType}</p>
          </div>
          <div>
          <button onClick={deleteArmor}>x</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Armor Selector</h2>
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
              <label htmlFor="armor">Select a armor:</label>
              <select id="armor" onChange={handleArmorChange}>
                <option value="">--Please choose a armor--</option>
                {data[selectedCategory].map((armor) => (
                  <option key={armor.name} value={JSON.stringify(armor)}>
                    {armor.name}
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

export default ArmorSelector;
