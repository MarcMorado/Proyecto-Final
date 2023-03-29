import React, { useState, createContext } from "react";
import data from "../data/armor.json";

export const ArmorContext = createContext();

export const ArmorProvider = (props) => {
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

  const values = {
    data,
    selectedCategory,
    selectedArmor,
    handleCategoryChange,
    handleArmorChange,
    deleteArmor,
  };
  return (
    <ArmorContext.Provider value={values}>
      {props.children}
    </ArmorContext.Provider>
  );
};