import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { ModalStyles } from './ModalStyles';

const AddItemModal = ({ isOpen, onRequestClose, addFood }) => {
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState(0);
  const [imageMethod, setImageMethod] = useState('local');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const imgUrlRef = useRef('');

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
      let imageUrl = imgUrlRef.current;
      if (imageMethod === 'local' && imageFile) {
        imageUrl = await uploadFileToImgur(imageFile);
      }

      addFood({ name: foodName, imageUrl, price: foodPrice });

      setFoodName('');
      imgUrlRef.current = '';
      setImageFile(null);
      onRequestClose();
      
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
      imgUrlRef.current = '';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
      overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
      content: { backgroundColor: 'transparent', border: 0 },
      }}>

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
              Food Price:
              <input
                id="priceinput"
                type="number"
                onChange={(e) => setFoodPrice(e.target.value)}
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
                ref={imgUrlRef}
              />
              )}
            </div>
            {uploading && <p>Uploading image, please wait...</p>}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button className="greenbtn" type="submit" disabled={uploading}>
                {uploading ? 'Adding...' : 'Add Food'}
              </button>
              <button className="redbtn" type="button" onClick={onRequestClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </ModalStyles>
    </Modal>
  );
};

export default AddItemModal;
