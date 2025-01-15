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
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadFileToImgur = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
  
    const clientId = process.env.REACT_APP_IMGUR_CLIENT_ID;
    
    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return data.data.link;
      } else {
        throw new Error('Upload failed: ' + (data.data?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error uploading to Imgur:', error);
      throw error;
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!foodName.trim()) {
      console.error('Error: Food name is required');
      return;
    }

    try {
      setUploading(true);
      let imageUrl = imgUrl;
      if (imageMethod === 'local' && imageFile) {
        imageUrl = await uploadFileToImgur(imageFile);
      }

      addFood({ name: foodName, imageUrl });

      setFoodName('');
      setimgUrl('');
      setImageFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add food:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageMethodChange = (e) => {
    const newMethod = e.target.value;
    setImageMethod(newMethod);

    if (newMethod === 'url') {
      setImageFile(null);
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
          <div className="modalContent">
            <div className="modalHeader">
              <h3>Add New Food Item</h3>
            </div>
            <form onSubmit={handleAddFood}>
              <div>
                <label>
                  Food Name:
                  <input
                    id="foodinput"
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
                    id="imgsrc"
                    value={imageMethod}
                    onChange={handleImageMethodChange}
                  >
                    <option value="local">Upload</option>
                    <option value="url">URL</option>
                  </select>
                </label>
              </div>
              <div>
                {imageMethod === 'local' ? (
                  <input
                    id="imgfileinput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                ) : (
                  <input
                    id="imgurlinput"
                    type="text"
                    placeholder="Enter Image URL"
                    value={imgUrl}
                    onChange={(e) => setimgUrl(e.target.value)}
                  />
                )}
              </div>
              {uploading && <p>Uploading image, please wait...</p>}
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button className="addbtn" type="submit" disabled={uploading}>
                  {uploading ? 'Adding...' : 'Add Food'}
                </button>
                <button
                  className="closebtn"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
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
