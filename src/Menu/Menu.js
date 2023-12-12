import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Menu.scss'; // Import the CSS file
import axios from 'axios';
import styled from 'styled-components';
import SideNav from './SideNav';

const CustomNavBar = styled.nav`
  color: white;
`;

function Menu() {
  const [userId, setUserId] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const value = localStorage.getItem('userId');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserId(value || '');

    // Fetch user details when userId is available
    if (value) {
      // Replace the following API call with your actual API endpoint to fetch user details
      fetchUserDetails(value);
    }
  }, [value]);

  const fetchUserDetails = async (userId) => {
    try {
      // Replace the following with your actual API endpoint to fetch user details
      const response = await axios.get(`http://155.138.219.54:${3002}/api/users/${userId}`);
      const userData = response.data;

      // Assuming the API response has a "firstname" property
      setUserFirstName(userData.firstname);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserId('');
    setUserFirstName('');
    navigate('/login'); // Navigate directly to the login page
  };

  const isLoginPage = location.pathname === '/login';

  return (
   
      <ul>
        
        {userId && (
          <>
            {!isLoginPage && <SideNav />}
          </>
        )}
      </ul>
  );
}

export default Menu;
