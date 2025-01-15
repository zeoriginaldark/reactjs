import React, { useState, useEffect } from 'react';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import axios from 'axios';
import SearchItem from './SearchItem';

const ManagerUI = ({ isModalOpen, setIsModalOpen }) => {
  const API_URL = 'http://172.18.14.171:5000/foods';

  const [search, setSearch] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data) {
          setFoodItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching food items', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const addFood = (newFoodItem) => {
    axios
      .post(API_URL, newFoodItem)
      .then((response) => {
        setFoodItems((prevItems) => [...prevItems, response.data]);
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error adding food:', error.response.data);
        } else {
          console.error('Network error:', error);
        }
      });
  };

  const editFood = (id, newName) => {
    if (!newName.trim()) {
      console.error('Error: New name cannot be empty.');
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

  const deleteFood = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setFoodItems((prevItems) => prevItems.filter((food) => food.id !== id));
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error deleting food:', error.response.data);
        } else {
          console.error('Network error:', error);
        }
      });
  };

  const filteredFoodItems = search.trim()
    ? foodItems.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
      )
    : foodItems;

  return (
    <div id='mymgrui'>
      <SearchItem search={search} setSearch={setSearch} />
      <AddItem addFood={addFood} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <>
        {isLoading && <p style={{ padding: '20px' }}>Loading food items...</p>}
        {!isLoading && (
          <Content
            foodItems={filteredFoodItems}
            editFood={editFood}
            deleteFood={deleteFood}
          />
        )}
      </>
      <Footer length={filteredFoodItems.length} />
    </div>
  );
};

export default ManagerUI;
