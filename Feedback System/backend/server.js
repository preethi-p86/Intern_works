const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect to MySQL (adjust values as per your XAMPP setup)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // default in XAMPP
  password: "",       // default is empty in XAMPP
  database: "your_database_name",  // change this
});

// ✅ Check connection
db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL DB");
});

// ✅ Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  const query = `SELECT * FROM login_credentials WHERE Login_id = ? AND Password = ?`;

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Login query error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
