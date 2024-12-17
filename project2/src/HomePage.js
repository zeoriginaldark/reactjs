import React from 'react';
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
`;

const Homepage = () => {
  return (
    <StyledHomepage>
      <main>
        <h1>Welcome!</h1>
        <p>
          FoodMgr aims to provide a simple approach to manage food items
        </p>
      </main>
    </StyledHomepage>
  );
};

export default Homepage;
