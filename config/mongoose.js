// config/mongoose.js

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://abhaychauhan836481:AXpyO1TB9V0Z2FqJ@cluster1.cvlmjna.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));

db.once('open', () => console.log('DB Connected..!'));

module.exports = db;
