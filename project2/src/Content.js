import React from 'react';
import './Content.css'
import Itemlist from './Itemlist';

const Content = ({ foodItems, deleteFood }) => {
  return (
  <main>
    <div>
      <Itemlist 
        foodItems={foodItems}
        deleteFood={deleteFood}
      />
    </div>

  </main>
  )
}

export default Content;
