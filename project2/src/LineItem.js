import {React, useState} from 'react';

const LineItem = ({
  food,
  deleteFood,
  editFood,
  isEditing,
  disableInteraction,
  onEdit,
  onCancelEdit,
}) => {
  const [newName, setNewName] = useState(food.name);
  const [newPrice, setNewPrice] = useState(food.price || '');
  const [newImg, setNewImg] = useState(food.imageUrl || '');

  const handleSave = (e) => {
    e.preventDefault();
    const finalImgUrl = newImg.trim() === '' ? '/images/default.jpg' : newImg;

    editFood(newName.trim(), finalImgUrl.trim(), parseFloat(newPrice));
    onCancelEdit();
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <input
            name="newname"
            type="text"
            value={newName}
            placeholder="Food name"
            onChange={(e) => setNewName(e.target.value)}
            disabled={disableInteraction}
            required
          />
          <input
            name="newprice"
            type="number"
            value={newPrice}
            placeholder="Food price"
            onChange={(e) => setNewPrice(e.target.value)}
            disabled={disableInteraction}
          />
          <input
            name="newimg"
            type="text"
            value={newImg}
            placeholder="Food image location"
            onChange={(e) => setNewImg(e.target.value)}
            disabled={disableInteraction}
          />
          <button type="submit" className="greenbtn" disabled={disableInteraction}>
            Save
          </button>
          <button type="button" className="redbtn" onClick={onCancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <div className="foodContent">
            <img src={food.imageUrl || '/images/default.jpg'} alt={food.name} className="foodImage" />
            <span className="foodName">{food.name}</span>
            <span className="foodPrice">{food.price}</span>
          </div>
          <button className="greenbtn" onClick={onEdit} disabled={disableInteraction}>
            Edit
          </button>
          <button className="redbtn" onClick={() => deleteFood(food.id)} disabled={disableInteraction}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default LineItem;
