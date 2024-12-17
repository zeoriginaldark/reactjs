import React from 'react';
import styled from 'styled-components';

const StyledContactPage = styled.div`
  main {
    flex: 1 0 auto;
    font-family: 'Arial', sans-serif;
    padding: 20px;
    border-radius: 10px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ContactPage = () => {
  return (
    <StyledContactPage>
      <main>
        <p>
          Find us at +977 xxx xxxx xxx
        </p>
      </main>
    </StyledContactPage>
  );
};

export default ContactPage;
