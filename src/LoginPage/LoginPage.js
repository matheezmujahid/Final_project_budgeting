import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        if (userData.accessToken) {
          handleToken(userData.accessToken);

          const decodedToken = decodeToken(userData.accessToken);

          if (decodedToken && decodedToken.userId) {
            const { userId } = decodedToken;
            const { firstname } = userData;

            localStorage.setItem("userId", userId);
            localStorage.setItem("firstname", firstname);

            navigate("/Dashboard");
          } else {
            console.error("User ID not found in decoded token:", decodedToken);
          }
        } else {
          console.error("Access token not found in server response:", userData);
        }
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleToken = (token) => {
    localStorage.setItem("token", token);

    const expirationTime = new Date().getTime() + 60 * 1000;
    localStorage.setItem("tokenExpiration", expirationTime);
  };

  const decodeToken = (token) => {
    try {
      const decodedString = atob(token.split(".")[1]);
      const decodedObject = JSON.parse(decodedString);
      return decodedObject;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto", // Center horizontally
      padding: "20px",
      boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Light gray background
      borderRadius: "8px",
      textAlign: "center",
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url("/background.png")`, // Replace with the actual path to your image
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(8px)", // Optional: Add a blur effect to the background
      zIndex: -1,
    },
    heading: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#4CAF50", // Green heading color
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      zIndex: 1, // Ensures the form is above the background
    },
    label: {
      fontSize: "16px",
      fontWeight: "500",
      color: "white",
      marginBottom: "10px",
      textAlign: "left",
    },
    input: {
      height: "40px",
      width: "100%",
      outline: "none",
      border: "1px solid #aaa", // Light gray border
      borderRadius: "6px",
      padding: "0 10px",
      fontSize: "16px",
      marginBottom: "16px",
      transition: "border-color 0.3s ease",
    },
    button: {
      color: "#fff",
      backgroundColor: "green", // Blue button color
      borderRadius: "6px",
      padding: "12px",
      cursor: "pointer",
      transition: "all 0.4s ease",
      border: "none",
      outline: "none",
      fontSize: "16px",
    },
    registerLink: {
      color: "blue", // Red register link color
      textDecoration: "none",
      fontSize: "14px",
      marginTop: "12px",
      transition: "color 0.4s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}></div>
      <h2 style={styles.heading}>Welcome !</h2>
      <form style={styles.form}>
        <label style={styles.label}>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={styles.input}
          />
        </label>
        <button type="button" onClick={handleLogin} style={styles.button}>
          Log In
        </button>
      </form>
      <Link to="/register" style={styles.registerLink}>
        New user? Register here
      </Link>
      
    </div>
  );
};

export default LoginPage;
