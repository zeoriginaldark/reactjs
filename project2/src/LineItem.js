import React, { useState } from 'react';

const LineItem = ({ food, deleteFood, editFood }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(food.name);
  const [newImg, setNewImg] = useState(food.imageUrl);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    editFood(food.id, newName);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            value={newImg}
            onChange={(e) => setNewImg(e.target.value)}
          />
          <div className='btnGroup'>
            <button className='savebtn' onClick={handleSave}>Save</button>
            <button className='cancelbtn' onClick={handleEditToggle}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className='foodContent'>
            <img
              src={food.imageUrl || '/images/default.jpg'}
              alt={food.name}
              className='foodImage'
            />
            <span className='foodName'>{food.name}</span>
          </div>
          <div className='btnGroup'>
            <button className='editbtn' onClick={handleEditToggle}>Edit</button>
            <button className='deletebtn' onClick={() => deleteFood(food.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default LineItem;
