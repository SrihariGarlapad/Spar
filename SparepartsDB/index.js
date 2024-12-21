const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDB } = require('./config/db');
const productRoutes = require('./Routes/sparepartsroutes');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', productRoutes);

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at port ${port}`);
});
