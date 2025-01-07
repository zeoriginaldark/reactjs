import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { ModalStyles } from './ModalStyles';

const StyledForm = styled.div`
  .addbtn {
    background-color: #008a22;
    color: ${({ theme }) => theme.buttonText};
    padding: 5px 10px;
    border: none;
    margin-left: 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .addbtn:hover {
    background-color: #005e1f;
  }

  .closebtn {
    background-color: #ff0000;
    color: ${({ theme }) => theme.buttonText};
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

  .closebtn:hover {
    background-color: #960a0a;
  }
`;

const AddItem = ({ addFood }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [imageMethod, setImageMethod] = useState('local');
  const [imgUrl, setimgUrl] = useState(''); 
  const [imageFile, setImageFile] = useState('');

  const handleAddFood = (e) => {
    e.preventDefault();
    if (!foodName.trim()) {
      console.error('Error: Food name is required');
      return;
    }

    const imageUrl = imageMethod === 'url' ? imgUrl : URL.createObjectURL(imageFile);
    addFood({ name: foodName, imageUrl });

    setFoodName('');
    setimgUrl('');
    setImageFile(null);
    setIsModalOpen(false);
  };

  const handleImageMethodChange = (e) => {
    const newMethod = e.target.value;
    setImageMethod(newMethod);
    
    if (newMethod === 'url') {
      setImageFile(''); 
    } else {
      setimgUrl('');
    }
  };

  return (
    <StyledForm>
      <button className="addbtn" onClick={() => setIsModalOpen(true)}>
        Add Food
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
      >
        <ModalStyles>
          <div className='modalContent'>
            <div className='modalHeader'>
              <h3>Add New Food Item</h3>
            </div>
            <form onSubmit={handleAddFood}>
              <div>
                <label>
                  Food Name:
                  <input
                    id='foodinput'
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Image Source:
                  <select
                    id='imgsrc'
                    value={imageMethod}
                    onChange={handleImageMethodChange}
                  >
                    <option value="local">Upload</option>
                    <option value="url">URL</option>
                  </select>
                </label>
              </div>
              <div>
                {imageMethod === 'local' ? 
                (
                  <input
                    id='imgfileinput'
                    type="file"
                    accept="image/*"
                    value={imageFile}
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                )
                : (
                  <input
                    id='imgurlinput'
                    type="text"
                    placeholder="Enter Image URL"
                    value={imgUrl}
                    onChange={(e) => setimgUrl(e.target.value)}
                  />
                )}
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button className='addbtn' type="submit">Add Food</button>
                <button className='closebtn' type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </ModalStyles>
      </Modal>
    </StyledForm>
  );
};

export default AddItem;
