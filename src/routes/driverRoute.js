const express = require('express');
const { manageDriver } = require('../controllers/DriverControler');
module.exports = (app) => {
app.post('/api/manage-driver', manageDriver);

}
