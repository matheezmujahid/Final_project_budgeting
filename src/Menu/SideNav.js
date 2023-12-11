// SideNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SideNavContainer = styled.div`
  width: 200px;
  height: 50%;
  background-color: ;
  padding-top: 20px;
  position: fixed;
`;

const buttonStyle = {
  width: '100%',
  backgroundColor: '',
  display: 'block',
  textDecoration: 'none',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  borderRadius: '4px',
  margin: '5px 0',
};
const NavItem = styled.div`
  padding: 10px;
  font-size: medium;
  font-family:Georgia, 'Times New Roman', Times, serif;
  color: white; // Set text color to white
  text-decoration: none;
  &:hover {
    background-color: #555;
  }
  a {
    color: white;
  }
`;

const SideNav = () => {
  return (
    
    <SideNavContainer>
  <NavItem>
    <Link to="/Dashboard" style={buttonStyle}>Dashboard</Link>
  </NavItem>
  <NavItem>
    <Link to="/configuration" style={buttonStyle}>Configuration</Link>
  </NavItem>
  <NavItem>
    <Link to="/BudgetUsed" style={buttonStyle}>Budget Used</Link>
  </NavItem>
  <NavItem>
    <Link to="/login" style={buttonStyle}>Logout</Link>
  </NavItem>
</SideNavContainer>

  );
};

export default SideNav;
