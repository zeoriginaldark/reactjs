import React, {useState} from 'react';

const LineItem = ({food, deleteFood, editFood}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(food.name);

  const handleEditToggle = () =>{
    setIsEditing(!isEditing);
  };

  const handleSave = () =>{
    editFood(food.id, newName);
    setIsEditing(false);
  }

  return (
    <li>
      {isEditing?(
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className='btn-group'>
            <button className='savebtn' onClick={handleSave}>Save</button>
            <button className='cancelbtn' onClick={handleEditToggle}>Cancel</button>
          </div>
        </>
      ): (
        <>
          {food.name}
          <div className='btn-group'>
            <button className='editbtn' onClick={handleEditToggle}>Edit</button>
            <button className='deletebtn' onClick={()=> deleteFood(food.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  )
}

export default LineItem;
