// backend/profileEditRoute.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT || 3306
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database (Profile Edit Route)');
});

// Middleware to parse JSON
router.use(express.json());

// GET route for the edit profile page
router.get('/profile/edit', (req, res) => {
    // Check if user is logged in (assuming session is used)
    if (!req.session || !req.session.uid) {
        return res.redirect('/login');
    }

    const query = 'SELECT name, bio FROM Users WHERE id = ?';
    db.query(query, [req.session.uid], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        if (results.length > 0) {
            res.render('profile-edit', { user: results[0] });
        } else {
            res.status(404).send("User not found");
        }
    });
});

// POST route to handle profile updates
router.post('/profile/edit', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        return res.status(400).send("Name and bio are required");
    }
    const query = 'UPDATE Users SET name = ?, bio = ? WHERE id = ?';
    db.query(query, [name, bio, req.session.uid], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.redirect('/profile');
    });
});

module.exports = router;
