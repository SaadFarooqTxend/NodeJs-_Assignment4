const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Middleware
const requestLogger = require('./middlewares/requestLogger');
const validateProduct = require('./middlewares/validateProduct');

// Controllers
const productController = require('./Controllers/productController');

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming requests
app.use(requestLogger);

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

