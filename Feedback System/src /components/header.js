// src/components/header.js

import React from "react";
import logo from "../assets/only-logo.webp";

const StickyHeader = () => {
  return (
    <header style={styles.header}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h1 style={styles.title}>Student Feedback Portal</h1>
    </header>
  );
};

const styles = {
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  logo: {
    height: "60px",
    marginRight: "15px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default StickyHeader;
