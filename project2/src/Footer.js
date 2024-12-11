import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  footer{
    flex: 0 0 auto;
  }

  p{
    text-align: center;
    margin-top: 20px;
    font-size: 0.8rem;
    color: #888;
    padding-bottom:20px;
  }
`

const Footer = ({length}) => {
    return (
      <StyledFooter>
        <footer>
          <p>{length} List {length === 1? "item" : "items"}</p>
        </footer>
      </StyledFooter>
    )
}

export default Footer;
