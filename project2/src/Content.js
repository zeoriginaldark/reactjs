import React from 'react';
import './Content.css'
import Itemlist from './Itemlist';

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
      <Itemlist 
        foodItems={foodItems}
        deleteFood={deleteFood}
      />
    </div>

  </main>
  )
}

export default Content;
