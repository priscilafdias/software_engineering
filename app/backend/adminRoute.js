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


// Route to handle storing messages
router.post('/send-message', (req, res) => {
    console.log(req.body); // Log the received data

    const { sender_id, receiver_id, content } = req.body;
    
    if (!sender_id || !receiver_id || !content) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const query = `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`;
    db.query(query, [sender_id, receiver_id, content], (err, result) => {
      if (err) {
        console.error('Error inserting message:', err);
        return res.status(500).json({ error: 'Failed to send message' });
      }
      res.status(200).json({ success: true, message: 'Message sent successfully' });
    });
});

// GET route to fetch chat messages for admin
router.get('/admin/messages', (req, res) => {
  const query = 'SELECT * FROM messages ORDER BY timestamp ASC';

  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }

      res.status(200).json(results); // Send all messages to the frontend
  });
});

// GET route to fetch chat messages for user
router.get('/user/messages', (req, res) => {
  const query = 'SELECT * FROM messages ORDER BY timestamp ASC';

  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }

      res.status(200).json(results); // Send all messages to the frontend
  });
});


module.exports = router;
