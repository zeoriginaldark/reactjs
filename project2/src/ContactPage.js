import React, { useState } from 'react';
import styled from 'styled-components';

const StyledContactPage = styled.div`
  main {
    flex: 1 0 auto;
    font-family: 'Arial', sans-serif;
    padding: 20px;
    border-radius: 10px;
  }

  .form-container {
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #000;
    border-radius: 10px;
    max-width: 600px;
  }

  .contact-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .contact-buttons button {
    flex: 1;
    margin: 0 5px;
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: #fff;
    background-color: #000;
    transition: background-color 0.3s;
  }

  .contact-buttons button.active {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }

  .contact-content {
    margin-top: 20px;
  }

  .contact-content h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .form-section label {
    display: block;
    margin: 10px 0 5px;
    font-size: 1rem;
    font-weight: bold;
  }

  .form-section input,
  .form-section textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
  }

  .form-section button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
  }

  .contact-info {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState('email');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="contact-content">
            <h2>Support Chat</h2>
            <p>Welcome to support chat! An agent will be with you shortly...</p>
          </div>
        );
      case 'call':
        return (
          <div className="contact-content">
            <h2>Contact Information</h2>
            <p>Phone: +977 x xxxxxxx</p>
            <p>Email: support@brainfoodmgr.com</p>
            <p>Socials: @brainfoodmgr on Twitter, Instagram, and Facebook</p>
          </div>
        );
      case 'email':
      default:
        return (
          <form className="form-section" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required autoComplete='false'/>
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" name="email" required autoComplete='false'/>
            <label htmlFor="message">Query</label>
            <textarea id="message" name="message" rows="4" required></textarea>
            <button type="submit">Submit</button>
          </form>
        );
    }
  };

  return (
    <StyledContactPage>
      <main>
        <p>
          We'd love to hear from you! You can reach out to us via the given methods.
        </p>
        <div className="form-container">
          <div className="contact-buttons">
            <button
              className={activeTab === 'chat' ? 'active' : ''}
              onClick={() => setActiveTab('chat')}
            >
              Via Support Chat
            </button>
            <button
              className={activeTab === 'call' ? 'active' : ''}
              onClick={() => setActiveTab('call')}
            >
              Via Call
            </button>
            <button
              className={activeTab === 'email' ? 'active' : ''}
              onClick={() => setActiveTab('email')}
            >
              Via Email Form
            </button>
          </div>
          {renderContent()}
        </div>
      </main>
    </StyledContactPage>
  );
};

export default ContactPage;
