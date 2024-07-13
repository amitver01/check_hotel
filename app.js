// server.js
const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport = require('./auth'); // Import the configured passport instance
const bodyParser = require('body-parser');
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemsRoutes");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize passport
app.use(passport.initialize());

// Encapsulated authentication middleware
const authenticateUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    // If authentication successful, you may want to store user in req.user
    req.user = user;
    next();
  })(req, res, next);
};

// Define the / route with encapsulated authentication middleware
app.get('/', authenticateUser, (req, res) => {
  res.send("HAR HAR MAHADEV");
});

// Routes
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
