const { default: db } = require('../models');

// Create Route
module.exports.createRoute = (req, res) => {
  const {
    query_type = 'insert',
    route_id = null,
    origin,
    destination,
    distance,
    estimated_time,
    status = 'active' // Default status is 'active'
  } = req.body;

  db.sequelize.query(`CALL routes(
    :query_type,
    :route_id,
    :origin,
    :destination,
    :distance,
    :estimated_time,
    :status
  )`, {
    replacements: {
      query_type,
      route_id,
      origin,
      destination,
      distance,
      estimated_time,
      status
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
};

// Fetch Route
module.exports.fetchRoute = (req, res) => {
  const { route_id } = req.params;

  db.sequelize.query(`CALL routes(
    :query_type,
    :route_id,
    NULL, NULL, NULL, NULL, NULL
  )`, {
    replacements: {
      query_type: 'select',
      route_id
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
};

// Update Route
module.exports.updateRoute = (req, res) => {
  const { route_id } = req.params;
  const {
    origin,
    destination,
    distance,
    estimated_time,
    status
  } = req.body;

  db.sequelize.query(`CALL routes(
    :query_type,
    :route_id,
    :origin,
    :destination,
    :distance,
    :estimated_time,
    :status
  )`, {
    replacements: {
      query_type: 'update',
      route_id,
      origin,
      destination,
      distance,
      estimated_time,
      status
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
};

// Delete Route
module.exports.deleteRoute = (req, res) => {
  const { route_id } = req.params;

  db.sequelize.query(`CALL routes(
    :query_type,
    :route_id,
    NULL, NULL, NULL, NULL, NULL
  )`, {
    replacements: {
      query_type: 'delete',
      route_id
    },
    type: db.Sequelize.QueryTypes.CALL
  })
  .then((resp) => {
    res.status(200).json({ success: true, message: 'Route deleted successfully.' });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  });
};
