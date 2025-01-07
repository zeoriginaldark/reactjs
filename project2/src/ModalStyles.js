import styled from 'styled-components';

export const ModalStyles = styled.div`
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  .modalContent {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    padding: 20px;
    width: 400px;
    border-radius: 10px;
  }

  .modalHeader h3 {
    text-align: center;
  }  
  
  select{
    padding: 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.9rem;
  }

  input[type="text"] {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  input[type="file"] {
    padding: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
  }

  .closebtn {
    background-color: #ff0000;
    color: ${({ theme }) => theme.buttonText};
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .closebtn:hover {
    background-color: #960a0a;
  }

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

export default ModalStyles;
