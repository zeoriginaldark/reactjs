import React from 'react';
import Itemlist from './Itemlist';
import styled from 'styled-components';

const StyledMain = styled.div`
  main{
    flex: 1 0 auto;
    font-family: 'Arial', sans-serif;
    padding: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content:space-between;
    padding:10px;
    flex-direction: column;
    background-color: ${({ theme }) => theme.listbg};
    color: ${({ theme }) => theme.listtext};
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  li:hover {
    background-color: ${({ theme }) => theme.listbghover};
  }

  button{
    margin-right: 10px;
  }

  .redbtn{
    background-color: #ff0000;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

  .redbtn:hover{
    background-color: #960a0a;
  }

  .greenbtn {
    background-color: #008a22;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }
    
  .greenbtn:hover {
    background-color: #005e1f;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  input[type="number"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  .foodContent {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
  }

  .foodImage {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom:10px;
  }

  .foodName {
    flex-grow: 1;
    font-size: 1rem;
  }

  .foodPrice {
    flex-grow: 1;
    font-size: 1rem;
  }
`

const Content = ({ foodItems, deleteFood, editFood }) => {
  return (
    <StyledMain>
      <main>
        <div>
          <Itemlist 
            foodItems={foodItems}
            deleteFood={deleteFood}
            editFood={editFood}
          />
        </div>
      </main>
    </StyledMain>
  )
}

export default Content;
