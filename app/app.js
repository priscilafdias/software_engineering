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
const registerRoute = require('./backend/registerRoute.js');

// Use the register route for POST requests
app.use(accessRoute);
app.use(registerRoute);


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


app.get("/detail", (req, res) => {
    res.render("detail"); // Renders detail.pug
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


// for outfit-list
// Sample outfit data (In real-world, fetch from DB)
const outfits = [
    { id: 1, name: "Birthday Party Dress", size: "S", price: "£20", image: "/images/kids.webp", description: "Perfect outfit for kids' birthday parties." },
    { id: 2, name: "Wedding Dress", size: "L", price: "£100", image: "/images/wedding.jpg", description: "Elegant wedding dress for your big day." },
    { id: 3, name: "Kids Skirt", size: "S", price: "£12", image: "/images/kidschool.jpg", description: "Casual skirt for school events." },
    { id: 4, name: "One Piece Dress", size: "XL", price: "£22.56", image: "/images/date.jpg", description: "Stylish and elegant one-piece for date nights." }
  ];

// Route to show outfit details
app.get("/outfit/:id", (req, res) => {
    const outfit = outfits.find(o => o.id == req.params.id);
    if (!outfit) return res.status(404).send("Outfit not found");
    res.render("detail-outfit", { outfit });
  });
  

// Start the server on port 3000
app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server running at http://127.0.0.1:3000');
    }
});
