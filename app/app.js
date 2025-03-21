// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

//Set the view engine to PUG
app.set('view engine', 'pug');
app.set('views', './views');


// Route to render the Access Page
app.get("/access", (req, res) => {
    res.render("access"); 
});


// Route to render the home page
app.get("/home", (req, res) => {
    res.render("home"); // This assumes "home.pug" is in the "views" folder
});


// Route to render the explore page
app.get("/explore", (req, res) => {
    res.render("explore"); // This assumes "explore.pug" is in the "views" folder
});

// To check if its working or not 
app.get("/", (req, res) => {
    res.send("Welcome to the fashion Page!"); // Send a response to the client
});


// Route to render the shared collection page
app.get("/sharedcollection", (req, res) => {
    res.render("sharedcollection"); // This assumes "sharedcollection.pug" is in the "views" folder
});


// Route to render the userlist page
app.get("/userlist", (req, res) => {
  res.render("userlist"); // Passing the users data to the template
});

// Route to render the detail page
app.get("/detail", (req, res) => {
    res.render("detail"); // Passing the users data to the template
});

// Start server on port 3000
app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server running at http://127.0.0.1:3000');
    }
});
