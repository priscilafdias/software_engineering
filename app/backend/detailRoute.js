const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
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
    console.log('Connected to MySQL database (Detail Route)');
});

// Middleware to parse JSON requests
router.use(express.json());

// Route to render outfit details
router.get("/detail-outfit/:id", (req, res) => {
    const outfitId = req.params.id;

    const query = "SELECT * FROM outfits WHERE id = ?";
    db.query(query, [outfitId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        
        if (results.length > 0) {
            res.render("detail-outfit", { outfit: results[0] }); // Render the Pug template with outfit data
        } else {
            res.status(404).send("Outfit not found");
        }
    });
});

module.exports = router;
