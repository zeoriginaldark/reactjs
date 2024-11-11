import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Content = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [foodInput, setFoodInput] = useState('');

    useEffect(() => {
        axios
          .get('http://localhost:5000/api/foods')
          .then((response) => {
            if (response.data.foodItems) {
              setFoodItems(response.data.foodItems);
            }
          })
          .catch((error) => console.error('Error fetching food items', error));
      }, []);
    
    const addFood = () => {
    console.log("Adding food", foodInput)

    if (foodInput) {
        axios
        .post('http://localhost:5000/api/foods', { name: foodInput })
        .then((response) => {
            setFoodItems(response.data.foodItems); // Assuming response contains updated food items
            setFoodInput('');
        })
        .catch((error) => console.error('Error adding food', error));
    }
    };

    const deleteFood = (food) => {
    axios
        .delete(`http://localhost:5000/api/foods/${food.id}`)
        .then((response) => {
        setFoodItems(response.data.foodItems); // Assuming the response contains updated food items
        })
        .catch((error) => console.error('Error deleting food', error));
    };

    return (
    <main>
        <div>
        <input
          type="text"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
          placeholder="Add a new food item"
        />
        <button onClick={addFood}>Add Food</button>
      </div>
      <ul>
        {foodItems.map((food, index) => (
          <li key={index}>
            {food.name} <button onClick={() => deleteFood(food)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Content
