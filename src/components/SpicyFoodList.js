import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newArray = [...foods, newFood];
    setFoods((foods) => newArray);
  }

  function handleFilterFood(event) {
    setFilterBy(event.target.value);
  }

  function updateFood(food, id) {
    if (food.id === id) {
      food.heatLevel += 1;
    }
    return food;
  }

  function handleClick(id) {
    const newArray = foods.map((food) => updateFood(food, id));
    setFoods((foods) => newArray);
  }

  function filterFood(food) {
    if (filterBy === "All") {
      return true;
    }
    console.log(food, food.cuisine, filterBy);
    return food.cuisine === filterBy;
  }

  const filteredList = foods.filter((food) => filterFood(food));

  const foodList = filteredList.map((food) => {
    return (
      <li onClick={() => handleClick(food.id)} key={food.id}>
        {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
      </li>
    );
  });

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select onChange={handleFilterFood} name="filter">
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
