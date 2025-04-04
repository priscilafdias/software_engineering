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
    const { email, password } = req.body;

    // Log the received data to the terminal (optional)
    console.log('Received data:', { email, password });

    // Basic validation for input data
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if the email exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' }); // Email not found
        }

        const user = results[0];

        // Compare the entered password directly with the stored password (plaintext)
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password' }); // Password doesn't match
        }

        // If login is successful, send a success message
        res.status(200).json({ 
            message: 'Login successful',
            email:user.email
        });
    });
});

module.exports = router;
