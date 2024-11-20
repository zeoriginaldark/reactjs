import React from 'react';
import './Footer.css';

const Footer = ({length}) => {
    return (
    <footer>
      <p>{length} List {length === 1? "item" : "items"}</p>
    </footer>
  )
}

export default Footer;
