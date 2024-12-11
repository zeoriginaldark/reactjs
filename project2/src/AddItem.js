import React from 'react';
import {useRef} from 'react';
import styled from 'styled-components';

const StyledForm = styled.div`
  .addForm{
    padding: 20px;
    padding-top: 0px;
  }

  .addbtn {
    background-color: #008a22;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
    
  .addbtn:hover {
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
`

const AddItem = ({foodInput, setFoodInput, addFood}) => {
  const inputRef = useRef();
  return (
    <StyledForm>
      <form className='addForm' onSubmit={addFood}>
        <input
          autoFocus
          ref={inputRef}
          id="addItem"
          type="text"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
          placeholder="Add a new food item"
        />
      <button className='addbtn' 
        onClick={() => inputRef.current.focus()}
      >
        Add Food
      </button> 
      </form>
    </StyledForm>
  )
}

export default AddItem;
