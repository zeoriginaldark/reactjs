import React, {useState} from 'react';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import Header from './Header';
import GlobalStyles from './GlobalStyles';
import Navbar from './NavBar';
import HomePage from './HomePage';
import ManagerUI from './ManagerUI';
import ContactPage from './ContactPage';

function App (){
  const [theme, setTheme] = useState(()=>localStorage.getItem('theme') || 'dark')
  
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
            <Route path="/" element={<HomePage />} />
            <Route path="/manager" element={<ManagerUI />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Router>
      </div>

    </ThemeProvider>
  );
}

export default App;