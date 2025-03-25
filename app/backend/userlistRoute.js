const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();  // To load environment variables for DB connection

// Create MySQL connection using .env variables
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT || 3306  // Default is 3306
})

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database (Userlist Route)');
});

// Middleware to parse JSON data from the frontend
router.use(express.json());

// GET all users - optimized version
router.get('/api/userlist', async (req, res) => {
    try {
      // 1. Execute query with column aliases for consistent naming
      const [users] = await db.query(`
        SELECT 
          id,
          first_name AS firstName,
          last_name AS lastName,
          profile_picture AS profilePic,
          outfits_available AS outfits,
          tags,
          description,
          DATE_FORMAT(created_at, '%Y-%m-%d') AS joinDate
        FROM profiles
        ORDER BY id ASC
      `);
  
      // 2. Transform data if needed (e.g., convert tags string to array)
      const transformedUsers = users.map(user => ({
        ...user,
        tags: user.tags ? user.tags.split(',') : []
      }));
  
      // 3. Send response
      res.json({
        success: true,
        count: transformedUsers.length,
        users: transformedUsers
      });
  
    } catch (err) {
      console.error('Database error:', {
        timestamp: new Date().toISOString(),
        error: err.message,
        query: err.sql?.substring(0, 100) // Log first 100 chars of SQL
      });
  
      res.status(500).json({
        success: false,
        error: 'Failed to fetch users',
        referenceId: `ERR-${Date.now()}`,
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  });
