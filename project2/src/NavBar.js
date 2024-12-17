import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  color: ${({ theme }) => theme.navtext};
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;

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

const Navbar = () => {
  return (
    <StyledNav>
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
