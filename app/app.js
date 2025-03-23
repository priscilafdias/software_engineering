// Import express.js
const express = require("express");

// Create express app
const app = express();

// Middleware to handle form submissions and JSON data
app.use(express.urlencoded({ extended: true }));  // For parsing form data
app.use(express.json()); // For parsing JSON data

// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static("app"));

// Set the view engine to PUG
app.set("view engine", "pug");
app.set("views", "./views");

// Import all routes 
const accessRoute = require('./backend/accessRoute.js');


// Use imported routes
app.use(accessRoute);  

// Routes for different pages
app.get("/home", (req, res) => res.render("home"));  // Renders home.pug
app.get("/explore", (req, res) => res.render("explore")); // Renders explore.pug
app.get("/sharedcollection", (req, res) => res.render("sharedcollection"));
app.get("/detail", (req, res) => res.render("detail"));

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the Fashion Page!");
});

// Handle 404 Errors - Page Not Found
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server running at http://127.0.0.1:3000`);
    }
});
