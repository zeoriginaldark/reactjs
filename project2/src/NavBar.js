import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  color: ${({ theme }) => theme.navtext};
  background: ${({ theme }) => theme.background};
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: ${({ $isModalOpen }) => ($isModalOpen ? 'relative' : 'sticky')}; /* Change position when modal is open */
  top: ${({ $isModalOpen }) => ($isModalOpen ? '0' : 'initial')}; /* Adjust top position */
  transition: background-color 0.3s ease, color 0.3s ease;

  .nav-links {
    display: flex;
    gap: 15px;
  }

  a {
    color: ${({ theme }) => theme.navtext};
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  a.active {
    color: ${({ theme }) => theme.navlinkactive};
    border-bottom: 2px solid ${({ theme }) => theme.navlinkactive};
  }

  a:hover {
    color: ${({ theme }) => theme.navlinkhover};
  }
`;

const Navbar = ({ $isModalOpen }) => {
  return (
    <StyledNav $isModalOpen={$isModalOpen}>
      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/manager">Manager</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
      </div>
    </StyledNav>
  );
};

export default Navbar;
