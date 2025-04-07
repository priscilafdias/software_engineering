// Import express.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


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
const registerRoute = require('./backend/registerRoute.js');
const shareRoute = require('./backend/shareRoute.js');
const detailRoute = require('./backend/detailRoute.js');
const profileRoute = require('./backend/profileRoute.js');
const adminRoute = require('./backend/adminRoute.js');
const transactionRoute = require("./backend/transactionRoute.js");

// Use the register route for POST requests
app.use(accessRoute);
app.use(registerRoute);
app.use(shareRoute);
app.use(detailRoute);
app.use(profileRoute);
app.use(adminRoute);
app.use(transactionRoute);


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
    res.send("Welcome to the fashion Page!(ReStyle). A home for everyone"); // Send a response to the client
});

app.get("/sharedcollection", (req, res) => {
    res.render("sharedcollection"); // Renders sharedcollection.pug
});

app.get("/profile", (req, res) => {
    res.render("profile"); // Renders profile.pug
});

app.get("/profile-edit", (req, res) => {
    res.render("profile-edit"); // Renders profile-edit.pug
});

app.get("/detail", (req, res) => {
    res.render("detail"); // Renders detail.pug
});

// In your route for the transaction page:
app.get('/transaction', (req, res) => {
  res.render('transaction', {
    title: 'Complete Your Transaction',
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});



app.get("/admin", (req, res) => {
    res.render("admin"); // Renders admin.pug
});

app.get("/user", (req, res) => {
  res.render("user"); // Renders user.pug
});

// Example user data
const users = [
    { id: 1, name: "Ishma Grg", outfits: 5, tags: "Wedding", img: "/images/user1.png", description: "Ishma loves sharing outfits for special occasions like weddings." },
    { id: 2, name: "Priscila Dias", outfits: 3, tags: "Birthday Party", img: "/images/user2.jpg", description: "Priscila enjoys styling outfits for various birthday parties." },
    { id: 3, name: "Maftuna A.", outfits: 4, tags: "Job Interviews", img: "/images/user3.webp", description: "Maftuna specializes in outfits for job interviews, aiming for professional looks." },
    { id: 4, name: "Hanna A.", outfits: 4, tags: "Date Nights", img: "/images/user4.jpg", description: "Hanna shares outfits perfect for romantic date nights." }
  ];

// Route to display the user list
app.get('/userlist', (req, res) => {
    // Check if users data exists and pass it to the template
    console.log(users); // Check if users are being passed correctly to the template
    res.render('userlist', { users: users }); // Pass the users array to the Pug template
  });

// Route to display a specific user's profile
app.get('/user-profile/:id', (req, res) => {
    const userId = req.params.id; // Get the user ID from the URL
    const user = users.find(u => u.id == userId); // Find the user with that ID
  
    if (user) {
      res.render('detail-user', { user }); // Pass the user object to the detail.pug template
    } else {
      res.status(404).send('User not found');
    }
  });



  app.get('/admin', (req, res) => {
    // Fetch messages from database
    const query = 'SELECT * FROM messages ORDER BY timestamp DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching messages:', err);
        return res.status(500).send('Error loading messages');
      }
  
      // Render the admin dashboard and pass messages
      res.render('admin', { messages: results });
    });
  });
  

// Start the server on port 3000
app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server running at http://127.0.0.1:3000');
    }
});
