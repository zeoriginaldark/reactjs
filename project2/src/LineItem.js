import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationM';

const LineItem = ({ food, deleteFood, editFood }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(food.name);
  const [newImg, setNewImg] = useState(food.imageUrl || '');
  
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

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

  const handleDelete = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDelete = () => {
    deleteFood(food.id);
    setIsConfirmingDelete(false);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
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
          <button type='submit' className='greenbtn'>Save</button>
          <button type='button' className='redbtn' onClick={handleEditToggle}>Cancel</button>
        </form>
      ) : (
        <div>
          <div className='foodContent'>
            <img
              src={food.imageUrl || '/images/default.jpg'}
              alt={food.name}
              className='foodImage'
            />
            <span className='foodName'>{food.name}</span>
          </div>
          <button className='greenbtn' onClick={handleEditToggle}>Edit</button>
          <button className='redbtn' onClick={handleDelete}>Delete</button>
        </div>
      )}

      {isConfirmingDelete && (
        <ConfirmationModal
          message={`Are you sure you want to delete "${food.name}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </li>
  );
};

export default LineItem;
