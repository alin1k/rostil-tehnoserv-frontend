const express = require('express');

module.exports = (Product) => {
  const router = express.Router();

  // Get all products
  router.get('/', async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Add a new product
  router.post('/', async (req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Update a product
  router.patch('/:id', async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product == null) {
        return res.status(404).json({ message: 'Cannot find product' });
      }

      const updatedProduct = await product.update(req.body);
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete a product
  router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product == null) {
        return res.status(404).json({ message: 'Cannot find product' });
      }

      await product.destroy();
      res.json({ message: 'Deleted Product' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
