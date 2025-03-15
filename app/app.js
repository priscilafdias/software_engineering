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
    res.render("access"); // This will render "views/access.pug"
});


// Route to render the home page
app.get("/home", (req, res) => {
    res.render("home"); // This assumes "fashion.pug" is in the "views" folder
});


// Route to render the explore page
app.get("/explore", (req, res) => {
    res.render("explore"); // This assumes "fashion.pug" is in the "views" folder
});


app.get("/", (req, res) => {
    res.send("Welcome to the home page!"); // Send a response to the client
});


// Start server on port 3000
app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server running at http://127.0.0.1:3000');
    }
});
