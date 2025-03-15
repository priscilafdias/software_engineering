// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

//Set the view engine to PUG
app.set('view engine', 'pug');
app.set('views', './app/views');


// Route to render the Access Page
app.get("/access", (req, res) => {
    res.render("access"); // This will render "views/access.pug"
});


// Route to render the home page
app.get("/home", (req, res) => {
    res.render("home"); // This assumes "fashion.pug" is in the "views" folder
});


// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000`);
});