import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import axios from 'axios';
import SearchItem from './SearchItem';

function App (){
  const API_URL = 'http://localhost:5000/foods';
  const [foodItems, setFoodItems] = useState([]);
  const [foodInput, setFoodInput] = useState('');
  const [search, setSearch] = useState('');

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
  
  const addFood = (e) => {
    e.preventDefault();
    if (foodInput.trim()) {
      const isDuplicate = foodItems.some((item) => item.name.toLowerCase() === foodInput.trim().toLowerCase());
      if (isDuplicate) {
        console.error("Error: Duplicate food item. This item is already in the list.");
        return;
      }

      console.log("Adding food", foodInput)
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
    }else{
      console.error('Error: Food input empty');
    }
  };

  const deleteFood = (id) =>{
    const foodToDel = foodItems.find((food)=> food.id=== id); 
    console.log("Deleting food", foodToDel);

    axios
      .delete(`${API_URL}/${id}`)
      .then(()=>{
        setFoodItems((prevItems)=> prevItems.filter((food)=> food.id !== id));
      })
      .catch((error)=>{
        if(error.response){
          console.error('Error deleting food:', error.response.data);
        }else{
          console.error('Network error:', error);
        }
      });
  };

  const filteredFoodItems = search.trim()
    ? foodItems.filter(
      food=> food.name.toLowerCase().includes(search.toLowerCase())
    )
    : foodItems;

  return (
    <div className="App">
      <Header title="FoodMgr" />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <AddItem
        foodInput={foodInput}
        setFoodInput={setFoodInput}
        addFood={addFood}
      />
      <Content 
        foodItems= {filteredFoodItems}
        deleteFood={deleteFood}
        setFoodItems={setFoodItems}
      />
      <Footer length={filteredFoodItems.length}/>
    </div>
  );
}

export default App;