import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
`;

const Button = styled.button`
    margin: 5px;
`;

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <Overlay>
        <ModalContainer>
            <p>{message}</p>
            <Button onClick={onConfirm}>Yes</Button>
            <Button onClick={onCancel}>No</Button>
        </ModalContainer>
    </Overlay>,
    document.getElementById('portal')
  );
};

export default ConfirmationModal;
