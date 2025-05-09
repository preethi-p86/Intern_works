// src/components/ForgotPassword.js

import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>
      <p>If you forgot your password, contact your coordinator or admin.</p>
      <Link to="/login" style={styles.backLink}>← Back to Login</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "400px",
    margin: "100px auto",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  backLink: {
    display: "block",
    marginTop: "20px",
    textDecoration: "none",
    color: "#007bff",
    fontSize: "16px",
  },
};

export default ForgotPassword;
