import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationM'; // Import the modal

const LineItem = ({ food, deleteFood, editFood }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(food.name);
  const [newImg, setNewImg] = useState(food.imageUrl || '');
  
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false); // State for confirmation modal

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
    setIsConfirmingDelete(true); // Show confirmation modal
  };

  const confirmDelete = () => {
    deleteFood(food.id); // Call delete function
    setIsConfirmingDelete(false); // Close confirmation modal
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false); // Close confirmation modal
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
            <button className='deletebtn' onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
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
