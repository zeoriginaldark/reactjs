import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./App.css";

function App() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodInput, setFoodInput] = useState("");

  useEffect(()=>{
    axios
      .get('')
  })

  const addFood =() =>{
    if (foodInput) {
      axios
        .post("http://localhost:5000/api/foodItems", {name: foodInput})
        .then((response) => {
          setFoodItems(response.data.foodItems);
          setFoodInput("");
        })
        .catch((error) => console.error("Error adding food", error));
    }
  }

  const deleteFood =(food) =>{
    axios
      .delete(`http://localhost:5000/api/foodItems/${food}`)
      .then((response) => {
        setFoodItems(response.data.foodItems);
      })
      .catch((error) => console.error("Error deleting food", error));
  }

  return (
    <div className="App">
      <h1>Food Manager</h1>
      <div>
        <input
          type='text'
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
          placeholder='Add a new food item'
        />
        <button onClick={addFood}>Add Food</button>
      </div>
      <ul>
        {foodItems.map((food, index) =>(
          <li key={index}>
            {food} <button onClick={()=>deleteFood(food)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
