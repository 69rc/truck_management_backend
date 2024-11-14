const express = require('express');
const { createAdmin, getAdmin ,updateAdmin,deleteAdmin} = require('../controllers/adminController'); // Adjust the path if necessary
const { Testing } = require('../controllers/testing');

module.exports = (app) => {
app.post('/api/admin', createAdmin);
app.get('/api/admins-login/:admin_id', getAdmin);
app.put("/api/admins-update/:admin_id",updateAdmin)
app.delete("/api/admins-delete/:admin_id",deleteAdmin)
}