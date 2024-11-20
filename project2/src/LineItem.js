import React from 'react'

const LineItem = ({food, deleteFood}) => {
  return (
    <li>
        {food.name}
        <button className='deletebtn' onClick={()=> deleteFood(food.id)}>Delete</button>
    </li>
  )
}

export default LineItem
