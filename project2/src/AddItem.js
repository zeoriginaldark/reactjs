import React from 'react';
import './AddItem.css'

const AddItem = ({foodInput, setFoodInput, addFood}) => {
  return (
    <form className='addForm'>
        <input
            id="addItem"
            type="text"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            placeholder="Add a new food item"
        />
      <button className='addbtn' onClick={addFood}>Add Food</button> 
    </form>
  )
}

export default AddItem;
