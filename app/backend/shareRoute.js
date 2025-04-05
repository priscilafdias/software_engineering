const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT || 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database (Upload Route)");
});

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

// Middleware
router.use(express.json());

// POST route to handle file upload and item data
router.post("/api/upload", upload.single("itemImage"), (req, res) => {
    const { itemName, itemCondition, itemSize, itemDescription, itemPrice, category } = req.body;

    // Validate inputs
    if (!itemName || !itemCondition || !itemSize || !itemDescription || !category) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Insert data into MySQL database
    const query = "INSERT INTO upload_outfit(itemName, itemCondition, itemSize, itemDescription, itemPrice, category, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [itemName, itemCondition, itemSize, itemDescription, itemPrice || 0, category, imageUrl], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Item uploaded successfully!", itemId: result.insertId });
    });
});

// GET route to fetch all uploaded items
router.get("/api/items", (req, res) => {
    db.query("SELECT * FROM upload_outfit ORDER BY created_at DESC", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
