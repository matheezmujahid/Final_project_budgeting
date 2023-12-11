import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SlidingNotification from './SlidingNotification';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [notification, setNotification] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstName, lastName }),
      });

      if (response.ok) {
        setNotification('Successfully registered! You can now login.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 5000);
      } else {
        const errorResponse = await response.json();
        console.error('Registration failed:', errorResponse.error);
        alert('Registration failed. Please try again.');
        setNotification('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Register Page</h2>
        <form style={styles.form}>
          <label style={styles.label}>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
          </label>

          <label style={styles.label}>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          </label>
          <br />
          <label style={styles.label}>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} />
          </label>
          <br />
          <label style={styles.label}>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} />
          </label>
          <br />
          <button type="button" onClick={handleRegister} style={styles.button}>
            Register
          </button>
        </form>
        <Link to="/login" style={styles.loginLink}>
          <button type="button" className="register-button">
            Back to Login
          </button>
        </Link>
        <SlidingNotification message={notification} onClose={() => setNotification('')} />
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    height: '100vh',
    backgroundImage: 'url("../public/background.png")', 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '400px',
    padding: '20px',
    boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
    backgroundColor: '#f8f8f8', 
    borderRadius: '8px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '10px',
  },
  input: {
    height: '40px',
    width: '100%',
    outline: 'none',
    border: 'none',
    padding: '0 10px',
    fontSize: '16px',
    fontWeight: '500',
    borderBottom: '2px solid rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  },
  button: {
    marginTop: '20px',
    color: '#fff',
    backgroundColor: '#44b5e6', // Blue button color
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    border: 'none',
    outline: 'none',
  },
  loginLink: {
    display: 'block',
    marginTop: '10px',
    color: '#5b13b9',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    fontWeight: '500',
    transition: 'color 0.4s ease',
  },
};

export default RegisterPage;
