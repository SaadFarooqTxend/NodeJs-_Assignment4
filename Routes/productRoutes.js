const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

// Read all products
router.get('/', productController.getAllProducts);

// Read a single product
router.get('/:id', productController.getProductById);

// Create a new product
router.post('/', validateProduct, productController.createProduct);

// Update an existing product
router.put('/:id', validateProduct, productController.updateProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
