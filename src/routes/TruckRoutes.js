const express = require('express');
const { createTruck,
  getTruckById,
  updateTruck,
  deleteTruck, } = require('../controllers/TruckController');

module.exports = (app) => {
  app.post('/api/truck', createTruck);
  app.get('/api/truck/:truck_id', getTruckById);
  app.put('/api/truck-update/:truck_id', updateTruck);
  app.delete('/api/truck-delete/:truck_id', deleteTruck);
};
