const express = require('express');
const {
  createDelivery,
  fetchDelivery,
  updateDelivery,
  deleteDelivery
} = require('../controllers/deliveryController');

module.exports = (app) => {
  app.post('/api/delivery', createDelivery);
  app.get('/api/deliveries/:delivery_id', fetchDelivery);
  app.put('/api/deliveries-update/:delivery_id', updateDelivery);
  app.delete('/api/deliveries-delete/:delivery_id', deleteDelivery);
};
