// index.js

const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
// Import DB
const db = require('./config/mongoose');
// Import passport 
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
// Import session cookie
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
// Notification 
const connectFlash = require('connect-flash');
const notification = require('./config/notification');
// Load environment variables
require('dotenv').config();

// Set up express application
const app = express();

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Use expressLayout middleware
app.use(expressLayout);

// Use body-parser for form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'assets' directory
app.use(express.static('./assets'));

// Create session cookie
const sessionStore = mongoStore.create({
    mongoUrl: process.env.MONGO_URL || 'mongodb+srv://abhaychauhan836481:AXpyO1TB9V0Z2FqJ@cluster1.cvlmjna.mongodb.net/',
    autoRemove: 'native', // or false if you prefer
});

app.use(expressSession({
    name: "Helthcare",
    secret: "any_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100,
    },
    store: sessionStore,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Notification middleware
app.use(connectFlash());
app.use(notification.setFlash);

// URL handler
app.use('/', require('./routes/index'));

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Server is up on port:", port);
});
