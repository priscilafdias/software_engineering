const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Create MySQL connection (matches your access route)
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
    console.error('Database connection failed:', err);
    return;
}
console.log('Connected to MySQL database (Details Route)');
});

// Middleware to parse JSON requests
router.use(express.json());


/**
 * POST detailed user profile
 * Endpoint: POST /api/user/details
 */
router.post('/api/user/details', (req, res) => {
     const { email, password } = req.body;

// Input validation 
if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
}
// First query: find user by email
db.query('SELECT id, password FROM users WHERE email = ?', [email], async (err, users) => {
if (err) {
    return res.status(500).json({ error: err.message });
}

if (users.length === 0) {
    return res.status(404).json({ error: "User not found" });
}

const user = users[0];

// Verify password 
 try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid" });
    }

// Get profile details
db.query(
    `SELECT 
    u.id, u.email, u.name,
    p.bio, p.location, p.profile_image_url,
    (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS post_count
    FROM users u
    LEFT JOIN profiles p ON u.id = p.user_id
    WHERE u.id = ?`,
    [user.id],
    (err, details) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
                    
    if (details.length === 0) {
        return res.status(404).json({ error: "Profile details not found" });
    }

// Return profile data 
const profileData = details[0];
res.json(profileData);
}
);
} catch (err) {
    console.error("Password comparison error:", err);
    return res.status(500).json({ error: "Authentication error" });
}
});
});

module.exports = router;
