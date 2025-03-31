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

// GET route to render the profile page
router.get('/profile', (req, res) => {
    // Check if the user is logged in (assuming session middleware is used)
    if (!req.session || !req.session.uid) {
        return res.redirect('/login');
    }

    // Query the database for user details
    // Assuming your Users table has columns: name, bio, donateCount, sellCount, rentCount, and avatar
    const query = 'SELECT name, bio, donateCount, sellCount, rentCount, avatar FROM Users WHERE id = ?';
    db.query(query, [req.session.uid], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database error");
        }
        if (results.length === 0) {
            return res.status(404).send("User not found");
        }

        // Render the profile template with user data
        res.render('profile', { user: results[0] });
    });
});

module.exports = router;
