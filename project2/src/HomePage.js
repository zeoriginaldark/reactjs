import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const Homepage = ({ foodItems = [] }) => {
  const [currentFood, setCurrentFood] = useState(null);

  useEffect(() => {
    if (foodItems.length === 0) return;

    const randomizeFood = () => {
      const randomIndex = Math.floor(Math.random() * foodItems.length);
      setCurrentFood(foodItems[randomIndex]);
    };

    randomizeFood();
    const interval = setInterval(randomizeFood, 3000);

    return () => clearInterval(interval);
  }, [foodItems]);

  return (
    <StyledHomepage>
      <main>
        <h1>Welcome!</h1>
        <p>
          FoodMgr aims to provide a simple approach to manage food items.
        </p>

        <div className="carousel">
          {currentFood ? (
            <div className="carousel-item">
              <img
                src={currentFood.imageUrl || '/images/default.png'}
                alt={currentFood.name}
              />
              <h2>{currentFood.name}</h2>
            </div>
          ) : (
            <p>Loading food items...</p>
          )}
        </div>
      </main>
    </StyledHomepage>
  );
};

export default Homepage;
