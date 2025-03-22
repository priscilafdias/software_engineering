const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Load environment variables

// Create MySQL connection using .env variables
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,       // e.g., "db"
    user: process.env.MYSQL_USER,       // e.g., "root"
    password: process.env.MYSQL_PASS, // e.g., "password"
    database: process.env.MYSQL_DATABASE, // e.g., "sd2-db"
    port: process.env.DB_PORT || 3306  // Default 
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database (Access Route)');
});

// Middleware to parse JSON requests
router.use(express.json());

/**
 * GET all users
 * Endpoint: GET /api/users
 */
router.get('/users', (req, res) => {
    db.query('SELECT * FROM Access', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

/**
 * GET a user by email
 * Endpoint: GET /api/users/:email
 */
router.get('/users/:email', (req, res) => {
    const email = req.params.email;
    db.query('SELECT * FROM Access WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
});


module.exports = router;
