import React, { useState, createContext } from "react";
import data from "../data/weapons.json";

export const WeaponContext = createContext();

export const WeaponProvider = (props) => {
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
    setSelectedWeapon(null);
  };

  const values = {
    data,
    selectedCategory,
    selectedWeapon,
    handleCategoryChange,
    handleWeaponChange,
    deleteWeapon,
  };
  console.log(data);
  return (
    <WeaponContext.Provider value={values}>
      {props.children}
    </WeaponContext.Provider>
  );
};
