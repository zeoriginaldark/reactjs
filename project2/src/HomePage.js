import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledHomepage = styled.div`
  main {
    flex: 1 0 auto;
    font-family: 'Arial', sans-serif;
    padding: 20px;
    border-radius: 10px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 20px;
  }

  .carousel-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 200px;
  }

  .carousel-item img {
    width: 100%;
    border-radius: 10px;
  }

  .carousel-item h2 {
    margin-top: 10px;
    font-size: 1.5rem;
  }

  .carousel-item p {
    font-size: 1rem;
    color: #555;
  }
`;

const Homepage = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentItemsRef = useRef([]);

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

  useEffect(() => {
    if (foodItems.length === 0) return;

    const rotateItems = () => {
      const remainingItems = foodItems.filter(item => !currentItemsRef.current.includes(item));
      
      if (remainingItems.length === 0) {
        currentItemsRef.current = foodItems.sort(() => Math.random() - 0.5).slice(0, 3);
      } else {
        const shuffled = [...remainingItems].sort(() => Math.random() - 0.5);
        currentItemsRef.current = shuffled.slice(0, 3);
      }
      setCurrentItems([...currentItemsRef.current]);
    };

    rotateItems();
    const interval = setInterval(rotateItems, 2500);

    return () => clearInterval(interval);
  }, [foodItems]);
  
  return (
    <StyledHomepage>
      <main>
        <h1>Welcome!</h1>
        <p>FoodMgr aims to provide a simple approach to manage food items.</p>

        {isLoading ? (
          <p>Loading food items...</p>
        ) : (
          <div className="carousel">
            {currentItems.map((food) => (
              <div key={food.id} className="carousel-item">
                <img
                  src={food.imageUrl || '/images/default.jpg'}
                  alt={food.name}
                />
                <h2>{food.name}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
    </StyledHomepage>
  );
};

export default Homepage;
