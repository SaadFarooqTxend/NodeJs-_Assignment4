const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

// Create a new product
const createProduct = (req, res) => {
  const newProduct = req.body;

  // Read the existing products from the JSON file
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    
    let products = JSON.parse(data);

    // Assign a new ID to the product
    newProduct.id = products.length + 1;  // This assumes IDs are sequential

    // Add the new product to the array
    products.push(newProduct);

    // Write the updated products array back to the JSON file
    fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
      if (err) return res.status(500).send('Error saving data');
      
      res.status(201).json(newProduct);  // Respond with the newly created product
    });
  });
};

// Get all products
const getAllProducts = (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    
    const products = JSON.parse(data);
    res.json(products);  // Respond with all products
  });
};

// Get a product by its ID
const getProductById = (req, res) => {
  const productId = parseInt(req.params.id);  // Convert ID to an integer

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    
    const products = JSON.parse(data);
    const product = products.find(p => p.id === productId);  // Find the product by ID

    if (!product) return res.status(404).send('Product not found');
    
    res.json(product);  // Respond with the found product
  });
};

// Update a product by its ID
const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);  // Convert ID to an integer
  const updatedProduct = req.body;  // Get updated data from request body

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    
    let products = JSON.parse(data);
    const index = products.findIndex(p => p.id === productId);  // Find the product by ID

    if (index === -1) return res.status(404).send('Product not found');
    
    // Update the product at the found index
    products[index] = { ...products[index], ...updatedProduct };

    // Write the updated products array back to the JSON file
    fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
      if (err) return res.status(500).send('Error saving data');
      
      res.json(products[index]);  // Respond with the updated product
    });
  });
};

// Delete a product by its ID
const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);  // Convert ID to an integer

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    
    let products = JSON.parse(data);
    const index = products.findIndex(p => p.id === productId);  // Find the product by ID

    if (index === -1) return res.status(404).send('Product not found');
    
    // Remove the product from the array
    products.splice(index, 1);

    // Write the updated products array back to the JSON file
    fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
      if (err) return res.status(500).send('Error saving data');
      
      res.status(204).send();  // No content response after successful deletion
    });
  });
};

// Filter products by category
const filterProductsByCategory = (req, res) => {
  const { category } = req.query;  // Get category filter from the query parameters

  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    
    const products = JSON.parse(data);
    const filteredProducts = products.filter(p => p.category === category);  // Filter products by category

    res.json(filteredProducts);  // Respond with the filtered products
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProductsByCategory,
};
