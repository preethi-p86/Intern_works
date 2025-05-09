// src/components/LoginPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for page redirection
import bgImage from "../assets/login-bg.jpg";
import headerImage from "../assets/only-logo.webp";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = formData;
    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful");
        setError("");
        navigate("/dashboard"); // redirect to next page
      } else {
        setError(data.message || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div style={{ ...styles.wrapper, backgroundImage: `url(${bgImage})` }}>
      <div style={styles.overlay}></div>

      {/* Header Logo */}
      <img src={headerImage} alt="Logo" style={styles.headerImage} />

      <div style={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
          <div style={styles.forgotContainer}>
            <a href="/forgot-password" style={styles.forgotLink}>Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 0,
  },
  headerImage: {
    position: "absolute",
    top: "20px",
    left: "20px",
    height: "130px",
    zIndex: 1,
  },
  container: {
    zIndex: 1,
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  forgotContainer: {
    textAlign: "right",
    marginTop: "10px",
  },
  forgotLink: {
    fontSize: "14px",
    textDecoration: "none",
    color: "#007bff",
  },
};

export default LoginPage;
