const express = require('express');

module.exports = (Furnizor) => {
  const router = express.Router();

  // Get all furnizori
  router.get('/', async (req, res) => {
    try {
      const furnizori = await Furnizor.findAll();
      res.json(furnizori);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Add a new furnizor
  router.post('/', async (req, res) => {
    try {
      const newFurnizor = await Furnizor.create(req.body);
      res.status(201).json(newFurnizor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Update a furnizor
  router.patch('/:id', async (req, res) => {
    try {
      const furnizor = await Furnizor.findByPk(req.params.id);
      if (furnizor == null) {
        return res.status(404).json({ message: 'Cannot find furnizor' });
      }

      const updatedFurnizor = await furnizor.update(req.body);
      res.json(updatedFurnizor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete a furnizor
  router.delete('/:id', async (req, res) => {
    try {
      const furnizor = await Furnizor.findByPk(req.params.id);
      if (furnizor == null) {
        return res.status(404).json({ message: 'Cannot find furnizor' });
      }

      await furnizor.destroy();
      res.json({ message: 'Deleted Furnizor' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
