const express = require('express');
const {
  createDispatcher,
  fetchDispatcher,
  editDispatcher,
  deleteDispatcher
} = require('../controllers/dispatchersController');

module.exports = (app) => {
  app.post('/api/dispatcher', createDispatcher);
  app.get('/api/dispatchers-fetch/:dispatcher_id?', fetchDispatcher);
  app.put('/api/dispatchers-update/:dispatcher_id', editDispatcher);
  app.delete('/api/dispatchers-delete/:dispatcher_id', deleteDispatcher);
};
