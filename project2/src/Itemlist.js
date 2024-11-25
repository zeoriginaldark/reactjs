import React from 'react';
import LineItem from './LineItem';

const Itemlist = ({foodItems, deleteFood, editFood}) => {
  return (
    <ul>
      {Array.isArray(foodItems) && foodItems.length > 0 ? (
        foodItems.map((food) => (
            <LineItem
                key={food.id} 
                food={food}
                deleteFood={deleteFood}
                editFood={editFood}
            />
        ))
      ) : (
        <p style={{marginTop: '2rem'}}>List is empty!</p>
      )}
    </ul>
  )
}

export default Itemlist;
