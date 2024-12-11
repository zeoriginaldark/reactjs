import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  header{
    flex: 0 0 auto;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
    padding-top:20px;
  }
`

const Header = ({ title }) => {
  return (
    <StyledHeader>
      <header>
        <h1>{title}</h1>
      </header>
    </StyledHeader>
      
  )
}

export default Header;