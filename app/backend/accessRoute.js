const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config(); // To load environment variables for DB connection

// Create MySQL connection using .env variables
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT || 3306 // Default is 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database (Access Route)');
});

// Middleware to parse JSON data from the frontend
router.use(express.json());


// POST route to handle user login
router.post('/api/login', (req, res) => {
    const {email, password } = req.body;

    // Log the received data to the terminal
    console.log('Received data:', {email, password });

    // Basic validation for input data
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if email already exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        // Insert new user into the database
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [email, password], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({message: 'User logged successfully!', userId: results.insertId });
        });
    });
});

// GET routes
router.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.get('/api/users/:email', (req, res) => {
    const email = req.params.email;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
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
