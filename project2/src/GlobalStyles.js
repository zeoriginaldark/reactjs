import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .App{
    display:flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .lightdarkbtn {
    background-color: #00758a;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    width: 96px;
    transition: background-color 0.3s ease;
  }

  .lightdarkbtn:hover {
    background-color: #00435e;
  }
`;

export default GlobalStyles;
