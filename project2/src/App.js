import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import axios from 'axios';

function App (){
  const API_URL = 'http://localhost:5000/foods';
  const [foodItems, setFoodItems] = useState([]);
  const [foodInput, setFoodInput] = useState('');

  useEffect(() => {
      axios
        .get(API_URL)
        .then((response) => {
          if (response.data) {
            setFoodItems(response.data);
          }
        })
        .catch((error) => console.error('Error fetching food items', error));
    }, []);
  
  const addFood = () => {
    console.log("Adding food", foodInput)

    if (foodInput) {
      axios
        .post(API_URL, { name: foodInput })
        .then((response) => {
          setFoodItems(prevItems => [...prevItems, response.data]); 
          setFoodInput('');
        })
        .catch((error) => {
          if (error.response) {
            console.error('Error adding food:', error.response.data);
          } else {
            console.error('Network error:', error);
          }
        });
    };
  };

  return (
    <div className="App">
      <Header title="Fooderington" />
      <Content 
        foodItems= {foodItems}
        addFood = {addFood}
        setFoodInput={setFoodInput}
        setFoodItems={setFoodItems}
      />
      <Footer/>
    </div>
  );
}

export default App;