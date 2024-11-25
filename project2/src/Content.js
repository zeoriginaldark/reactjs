import React from 'react';
import './Content.css'
import Itemlist from './Itemlist';

const Content = ({ foodItems, deleteFood, editFood }) => {
  return (
  <main>
    <div>
      <Itemlist 
        foodItems={foodItems}
        deleteFood={deleteFood}
        editFood={editFood}
      />
    </div>

  </main>
  )
}

export default Content;
