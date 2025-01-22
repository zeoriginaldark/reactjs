import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    padding: 20px;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;

    .addbtn {
    background-color: #008a22;
    color: ${({ theme }) => theme.buttonText};
    padding: 5px 10px;
    border: none;
    margin-left: 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
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

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <Overlay>
        <ModalContainer>
            <p>{message}</p>
            <button className='addbtn' onClick={onConfirm}>Yes</button>
            <button className='closebtn' onClick={onCancel}>No</button>
        </ModalContainer>
    </Overlay>,
    document.getElementById('portal')
  );
};

export default ConfirmationModal;
