import React from 'react';
import styled from 'styled-components';
import AddItemModal from './AddItemM';

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
`;

const AddItem = ({ addFood, isModalOpen, setIsModalOpen }) => {
  return (
    <StyledForm>
      <button className="addbtn" onClick={() => setIsModalOpen(true)}>
        Add Food Item
      </button>

      <AddItemModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        addFood={addFood}
      />
    </StyledForm>
  );
};

export default AddItem;
