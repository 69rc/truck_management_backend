import bcrypt from 'bcryptjs';
const { default: db } = require('../models');

module.exports = {
  // Create Dispatcher
  createDispatcher: (req, res) => {
    const {
      query_type = 'insert',
      dispatcher_id = null,
      name = null,
      phone = null,
      email = null,
      address = null,
      employee_id = null,
      experience_years = null,
      previous_employers = null,
      specializations = null,
      certifications = null,
      preferred_shift = null,
      availability = null,
      username = null,
      password = null
    } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, username, and password are required.' });
    }

    db.sequelize.query(`CALL dispatchers(
      :query_type,
      :dispatcher_id,
      :name,
      :phone,
      :email,
      :address,
      :employee_id,
      :experience_years,
      :previous_employers,
      :specializations,
      :certifications,
      :preferred_shift,
      :availability,
      :username,
      :password
    )`, {
      replacements: {
        query_type,
        dispatcher_id,
        name,
        phone,
        email,
        address,
        employee_id,
        experience_years,
        previous_employers,
        specializations,
        certifications,
        preferred_shift,
        availability,
        username,
        password: bcrypt.hashSync(password, 10)
      },
      type: db.Sequelize.QueryTypes.CALL
    })
    .then((resp) => {
      res.status(200).json({ success: true, data: resp });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ success: false, error: err });
    });
  },

  // Edit Dispatcher
  editDispatcher: (req, res) => {
    const {
      query_type = 'update',
      dispatcher_id,
      name = null,
      phone = null,
      email = null,
      address = null,
      employee_id = null,
      experience_years = null,
      previous_employers = null,
      specializations = null,
      certifications = null,
      preferred_shift = null,
      availability = null,
      username = null,
      password = null
    } = req.body;

    if (!dispatcher_id) {
      return res.status(400).json({ success: false, message: 'Dispatcher ID is required for updating.' });
    }

    db.sequelize.query(`CALL dispatchers(
      :query_type,
      :dispatcher_id,
      :name,
      :phone,
      :email,
      :address,
      :employee_id,
      :experience_years,
      :previous_employers,
      :specializations,
      :certifications,
      :preferred_shift,
      :availability,
      :username,
      :password
    )`, {
      replacements: {
        query_type,
        dispatcher_id,
        name,
        phone,
        email,
        address,
        employee_id,
        experience_years,
        previous_employers,
        specializations,
        certifications,
        preferred_shift,
        availability,
        username,
        password: password ? bcrypt.hashSync(password, 10) : null
      },
      type: db.Sequelize.QueryTypes.CALL
    })
    .then((resp) => {
      res.status(200).json({ success: true, data: resp });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ success: false, error: err });
    });
  },

  // Delete Dispatcher
  deleteDispatcher: (req, res) => {
    const { dispatcher_id } = req.body;

    if (!dispatcher_id) {
      return res.status(400).json({ success: false, message: 'Dispatcher ID is required for deletion.' });
    }

    db.sequelize.query(`CALL dispatchers(
      'delete',
      :dispatcher_id,
      null, null, null, null, null, null, null, null, null, null, null, null, null
    )`, {
      replacements: { dispatcher_id },
      type: db.Sequelize.QueryTypes.CALL
    })
    .then((resp) => {
      res.status(200).json({ success: true, message: 'Dispatcher deleted successfully.', data: resp });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ success: false, error: err });
    });
  },

  // Fetch Dispatcher(s)
  fetchDispatcher: (req, res) => {
    const { dispatcher_id = null } = req.query;

    db.sequelize.query(`CALL dispatchers(
      'select',
      :dispatcher_id,
      null, null, null, null, null, null, null, null, null, null, null, null, null
    )`, {
      replacements: { dispatcher_id },
      type: db.Sequelize.QueryTypes.CALL
    })
    .then((resp) => {
      if (resp.length === 0) {
        return res.status(404).json({ success: false, message: 'Dispatcher not found.' });
      }
      res.status(200).json({ success: true, data: resp });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ success: false, error: err });
    });
  }
};
