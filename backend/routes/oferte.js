const express = require('express');

module.exports = (Oferta) => {
  const router = express.Router();

  // Get all oferte
  router.get('/', async (req, res) => {
    try {
      const oferte = await Oferta.findAll();
      res.json(oferte);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Add a new oferta
  router.post('/', async (req, res) => {
    try {
      const newOferta = await Oferta.create(req.body);
      res.status(201).json(newOferta);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Update an oferta
  router.patch('/:uuid', async (req, res) => {
    try {
      const oferta = await Oferta.findOne({ where: { uuid: req.params.uuid } });
      if (oferta == null) {
        return res.status(404).json({ message: 'Cannot find oferta' });
      }

      const updatedOferta = await oferta.update(req.body);
      res.json(updatedOferta);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete an oferta
  router.delete('/:uuid', async (req, res) => {
    try {
      const oferta = await Oferta.findOne({ where: { uuid: req.params.uuid } });
      if (oferta == null) {
        return res.status(404).json({ message: 'Cannot find oferta' });
      }
      await oferta.destroy();
      res.json({ message: 'Deleted Oferta' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
