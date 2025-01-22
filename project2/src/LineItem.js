import React, { useState } from 'react';
import EditItemModal from './EditItemM';
import ConfirmationModal from './ConfirmationM';

const LineItem = ({
  food,
  deleteFood,
  editFood,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

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
      <div>
        <div className="foodContent">
          <img src={food.imageUrl || '/images/default.jpg'} alt={food.name} className="foodImage" />
          <span className="foodName">{food.name}</span>
          <span className="foodPrice">{food.price}</span>
        </div>
        <button className="greenbtn" onClick={() => setIsModalOpen(true)}>
          Edit
        </button>
        <button className="redbtn" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {isConfirmingDelete && (
        <ConfirmationModal
          message={`Are you sure you want to delete "${food.name}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <EditItemModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        food={food}
        editFood={editFood}
      />
    </li>
  );
};

export default LineItem;
