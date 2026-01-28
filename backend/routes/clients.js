const express = require('express');

module.exports = (Client) => {
  const router = express.Router();

  // Get all clients
  router.get('/', async (req, res) => {
    try {
      const clients = await Client.findAll();
      res.json(clients);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Add a new client
  router.post('/', async (req, res) => {
    try {
      const newClient = await Client.create(req.body);
      res.status(201).json(newClient);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Update a client
  router.patch('/:id', async (req, res) => {
    try {
      const client = await Client.findByPk(req.params.id);
      if (client == null) {
        return res.status(404).json({ message: 'Cannot find client' });
      }

      const updatedClient = await client.update(req.body);
      res.json(updatedClient);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete a client
  router.delete('/:id', async (req, res) => {
    try {
      const client = await Client.findByPk(req.params.id);
      if (client == null) {
        return res.status(404).json({ message: 'Cannot find client' });
      }
      await client.destroy();
      res.json({ message: 'Deleted Client' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
