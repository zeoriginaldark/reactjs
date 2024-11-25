import React from 'react';
import './AddItem.css';
import {useRef} from 'react';

const AddItem = ({foodInput, setFoodInput, addFood}) => {
  const inputRef = useRef();
  return (
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
  )
}

export default AddItem;
