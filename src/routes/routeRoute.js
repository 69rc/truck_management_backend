const express = require('express');
const {
  createRoute,
  fetchRoute,
  updateRoute,
  deleteRoute
} = require('../controllers/routeController');

module.exports = (app) => {
  app.post('/api/route', createRoute);
  app.get('/api/routes/:route_id', fetchRoute);
  app.put('/api/routes-update/:route_id', updateRoute);
  app.delete('/api/routes-delete/:route_id', deleteRoute);
};
