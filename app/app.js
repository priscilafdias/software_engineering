// Import express.js
const express = require("express");
const bodyParser = require("body-parser");

// Create express app
var app = express();

// Middleware to handle form submissions and JSON data
app.use(express.urlencoded({ extended: true }));  // For parsing form data
app.use(express.json()); // For parsing JSON data

// Add static files location
app.use(express.static("static"));  // Serve static files like CSS, JS, images

// Set the view engine to PUG
app.set("view engine", "pug");
app.set("views", "./views");

// Import all routes 
const accessRoute = require('./backend/accessRoute.js');
const userListRoute = require('./backend/userlistRoute.js');
const registerRoute = require('./backend/registerRoute.js');

// Register routes
app.use('/api', registerRoute);  // Using the register route at /api/register

// Routes for different pages
app.get("/access", (req, res) => {
    res.render("access");
});

app.get("/home", (req, res) => {
    res.render("home"); // Renders home.pug
});

app.get("/explore", (req, res) => {
    res.render("explore"); // Renders explore.pug
});

// To check if it's working or not
app.get("/", (req, res) => {
    res.send("Welcome to the fashion Page!"); // Send a response to the client
});

app.get("/sharedcollection", (req, res) => {
    res.render("sharedcollection"); // Renders sharedcollection.pug
});

app.get("/userlist", (req, res) => {
  res.render("userlist"); // Renders userlist.pug
});

app.get("/detail", (req, res) => {
    res.render("detail"); // Renders detail.pug
});


// Start the server on port 3000
app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server running at http://127.0.0.1:3000');
    }
});
