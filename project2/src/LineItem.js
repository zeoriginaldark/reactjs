import React, { useState } from 'react';

const LineItem = ({ food, deleteFood, editFood }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(food.name);
  const [newImg, setNewImg] = useState(food.imageUrl || '');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const finalImgUrl = newImg.trim() === '' ? '/images/default.jpg' : newImg;

    editFood(food.id, newName, finalImgUrl);
    setNewImg(finalImgUrl);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <input
            name="newname"
            type="text"
            value={newName}
            placeholder='Food name'
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <input
            name="newimg"
            type="text"
            value={newImg}
            placeholder='Food image location'
            onChange={(e) => setNewImg(e.target.value)}
          />
          <div className='btnGroup'>
            <button type='submit' className='savebtn'>Save</button>
            <button type='button' className='cancelbtn' onClick={handleEditToggle}>Cancel</button>
          </div>
        </form>
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
