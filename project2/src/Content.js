import React from 'react';
import './Content.css'

const Content = ({ foodItems, foodInput, addFood, deleteFood, setFoodInput }) => {
  return (
  <main>
    <div>
      <input
        type="text"
        value={foodInput}
        onChange={(e) => setFoodInput(e.target.value)}
        placeholder="Add a new food item"
      />
      <button className='addbtn' onClick={addFood}>Add Food</button>
    </div>
    <ul>
      {Array.isArray(foodItems) && foodItems.length > 0 ? (
        foodItems.map((food, index) => (
          <li key={food.id || index}>
            {food.name}
            <button onClick={()=> deleteFood(food.id)}>Delete</button>
          </li>
        ))
      ) : (
        <li>No food items available</li>
      )}
    </ul>

  </main>
  )
}

export default Content;
