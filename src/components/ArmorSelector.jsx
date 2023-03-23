import React, { useState } from "react";
import data from "../data/armor.json";
import "../styles/styleItems.css"

function ArmorSelector(props) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArmor, setSelectedArmor] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedArmor(null);
  };

  const handleArmorChange = (event) => {
    const armor = JSON.parse(event.target.value);
    setSelectedArmor(armor);
    props.setSelectedArmor(armor);
  };

  const deleteArmor = () => {
    setSelectedArmor(null)
  }

  return (
    <div className="armor-select">
      {selectedArmor ? (
        <div>
          <div>
          <p><strong>Name: </strong>{selectedArmor.name}</p>
          {selectedArmor.aC ? (
            <p><strong>Armor class: </strong>{selectedArmor.aC}</p>
          ): null}
          {selectedArmor.strength ? (
            <p><strong>Strength: </strong>{selectedArmor.strength}</p>
          ): null}
          {selectedArmor.stealth ? (
            <p><strong>Stealth: </strong>{selectedArmor.stealth}</p>
          ): null}
          {selectedArmor.weight ? (
            <p><strong>Weight: </strong>{selectedArmor.weight}</p>
          ): null}
          {selectedArmor.description ? (
            <p><strong>Description: </strong>{selectedArmor.description}</p>
          ): null}
          </div>
          <div>
          <button onClick={deleteArmor}>x</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Armor Selector</h2>
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
              <select id="armor" onChange={handleArmorChange}>
                <option value="">--Choose a armor--</option>
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
