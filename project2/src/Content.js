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
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.listbg};
    color: ${({ theme }) => theme.listtext};
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  li:hover {
    background-color: ${({ theme }) => theme.listbghover};
  }

  .deletebtn{
    background-color: #ff0000;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

  .deletebtn:hover{
    background-color: #960a0a;
  }

  .editbtn {
    background-color: #008a22;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }
    
  .editbtn:hover {
    background-color: #005e1f;
  }

  input[type="text"] {
    width: 20%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  .savebtn {
    background-color: #008a22;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }
    
  .savebtn:hover {
    background-color: #005e1f;
  }

  .cancelbtn{
    background-color: #ff0000;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

  .cancelbtn:hover{
    background-color: #960a0a;
  }

  .btngroup{
    display:flex;
    gap:10px;
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
