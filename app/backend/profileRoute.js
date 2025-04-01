// backend/profileRoute.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// Create a MySQL connection using environment variables
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT || 3306
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database (Profile Route)");
});

// Middleware to parse JSON requests
router.use(express.json());

// Route to render the profile page (with Pug)
router.get('/profile/:userId', (req, res) => {
    const userId = req.params.userId;

    // Fetch the user's profile data from the database
    db.query('SELECT firstname, lastname, email, profile_picture FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        const user = results[0];
        
        // Ensure the user data is being passed correctly to the Pug template
        console.log("User data:", user);  // Log the user data to check
        
        // Render the profile page with user data
        res.render('profile', { user: user });
    });
});

module.exports = router;
