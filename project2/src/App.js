import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import Header from './Header';
import GlobalStyles from './GlobalStyles';
import Navbar from './NavBar';
import HomePage from './HomePage';
import ManagerUI from './ManagerUI';
import ContactPage from './ContactPage';
import axios from 'axios';

function App (){
  const [theme, setTheme] = useState(()=>localStorage.getItem('theme') || 'dark')
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = 'http://localhost:5000/foods';

  useEffect(()=>{
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(API_URL);
        setFoodItems(response.data || []);
      } catch (error) {
        console.error('Error fetching food items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodItems();
  }, [])

  const toggleTheme = () =>{
    setTheme((prev) => {
      const newTheme =  prev === 'light'? 'dark': 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeProvider theme={theme ==='light'? lightTheme: darkTheme}>
      <GlobalStyles />
      <div className='App'>
        <Router>
          <Header title="FoodMgr" />
          <Navbar />
          <button className='lightdarkbtn' onClick={toggleTheme}>
            Mode: {theme === 'light' ? 'Light' : 'Dark'}
          </button>
          <Routes>
            <Route path="/" element={<HomePage foodItems={foodItems} isLoading={isLoading}/>} />
            <Route path="/manager" element={<ManagerUI foodItems={foodItems} setFoodItems={setFoodItems} />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Router>
      </div>

    </ThemeProvider>
  );
}

export default App;