const express = require('express');
const connectDB = require('./db');

const app = express();

// Connect to MongoDB
connectDB();

app.listen(3000, () => console.log('Server running on port 3000'));
