import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import {ModalStyles} from './ModalStyles';

const EditItemModal = ({ isOpen, onRequestClose, food, editFood }) => {
  const [newName, setNewName] = useState(food.name);
  const [newPrice, setNewPrice] = useState(food.price || 0);
  const [imageMethod, setImageMethod] = useState('url');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const imgUrlRef = useRef(food.imageUrl || '');

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

  const handleSave = async (e) => {
    e.preventDefault();

    if (!newName.trim()) {
      console.error('Error: Food name is required');
      return;
    }

    try {
      setUploading(true);
      let imageUrl = imgUrlRef.current;
      if (imageMethod === 'local' && imageFile) {
        imageUrl = await uploadFileToImgur(imageFile);
      }

      editFood(newName.trim(), imageUrl.trim(), parseFloat(newPrice));

      onRequestClose();
      
    } catch (error) {
      console.error('Failed to save', error);
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
      }}
    >
      <ModalStyles>
        <div className='modalContent'>
          <div className='modalHeader'>
            <h3>Edit Food Item</h3>
          </div>
          
          <form onSubmit={handleSave}>
            <div>
              <label>
                Food Name:
                <input
                  id="foodedit"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Food Price:
                <input
                  id="priceedit"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Image Source:
                <select
                  id="editimgsrc"
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
                  id="editimgfile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              ) : (
                <input
                  id="editimgurl"
                  type="text"
                  placeholder="Enter Image URL"
                  defaultValue={food.imageUrl}
                  ref={imgUrlRef}
                />
              )}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button className='greenbtn' type="submit">{uploading ? 'Saving...' : 'Save'}</button>
              <button className='redbtn' type="button" onClick={onRequestClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </ModalStyles>
    </Modal>
  );
};

export default EditItemModal;
