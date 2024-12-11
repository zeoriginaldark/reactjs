import React, {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import axios from 'axios';
import SearchItem from './SearchItem';
import GlobalStyles from './GlobalStyles';

function App (){
  const API_URL = 'http://localhost:5000/foods';
  const [theme, setTheme] = useState('light')
  const [foodItems, setFoodItems] = useState([]);
  const [foodInput, setFoodInput] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () =>{
    setTheme((prev) => (prev ==='light'?'dark' : 'light'));
  };

  useEffect(() => {
    const fetchItems = async() =>{
      try {
        axios
        .get(API_URL)
        .then((response) => {
          if (response.data) {
            setFoodItems(response.data);
          }
        })
      } catch(error) {
        console.error('Error fetching food items', error);
      } finally{
        setIsLoading(false);
      } 
    }
    
    setTimeout(() => {
      (async()=> await fetchItems())();
    }, 1500);
  }, []);

  const editFood = (id, newName) =>{
    if(!newName.trim()){
      console.error("Error:New name cannot be empty.");
      return;
    }

    axios
      .put(`${API_URL}/${id}`, { name: newName })
      .then((response) => {
        setFoodItems((prevItems) =>
          prevItems.map((food) =>
            food.id === id ? { ...food, name: response.data.name } : food
          )
        );
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error editing food:', error.response.data);
        } else {
          console.error('Network error:', error);
        }
      });
  };

  const addFood = (e) => {
    e.preventDefault();
    if (foodInput.trim()) {
      const isDuplicate = foodItems.some((item) => item.name.toLowerCase() === foodInput.trim().toLowerCase());
      if (isDuplicate) {
        console.error("Error: Duplicate food item. This item is already in the list.");
        return;
      }

      console.log("Adding food", foodInput);
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
    <ThemeProvider theme={theme ==='light'? lightTheme: darkTheme}>
      <GlobalStyles />
      <div className="App">
        <Header title="FoodMgr" />
        <button className='lightdarkbtn' onClick={toggleTheme}>
            Mode: {theme === 'light' ? 'Light' : 'Dark'}
        </button>
        <SearchItem 
          search={search}
          setSearch={setSearch}
        />
        <AddItem
          foodInput={foodInput}
          setFoodInput={setFoodInput}
          addFood={addFood}
        />
        <>
          {isLoading && <p>Loading food items...</p>}
          {!isLoading && <Content 
            foodItems= {filteredFoodItems}
            editFood={editFood}
            deleteFood={deleteFood}
          />}
        </>
        
        <Footer length={filteredFoodItems.length}/>
      </div>
    </ThemeProvider>
  );
}

export default App;