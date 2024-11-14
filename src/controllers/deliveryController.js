const { default: db } = require('../models');

module.exports.createDelivery = (req, res) => {
  const {
    query_type = 'insert',
    delivery_id = null,
    driver_id,
    vehicle_id,
    destination,
    status = 'pending', // Default status is 'pending'
    scheduled_date,
    delivery_date
  } = req.body;

  db.sequelize.query(`CALL deliveries(
    :query_type,
    :delivery_id,
    :driver_id,
    :vehicle_id,
    :destination,
    :status,
    :scheduled_date,
    :delivery_date
  )`, {
    replacements: {
      query_type,
      delivery_id,
      driver_id,
      vehicle_id,
      destination,
      status,
      scheduled_date,
      delivery_date
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

// Fetch Delivery
module.exports.fetchDelivery = (req, res) => {
  const { delivery_id } = req.params;

  db.sequelize.query(`CALL deliveries(
    :query_type,
    :delivery_id,
    NULL, NULL, NULL, NULL, NULL, NULL
  )`, {
    replacements: {
      query_type: 'select',
      delivery_id
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

// Update Delivery
module.exports.updateDelivery = (req, res) => {
  const { delivery_id } = req.params;
  const {
    driver_id,
    vehicle_id,
    destination,
    status,
    scheduled_date,
    delivery_date
  } = req.body;

  db.sequelize.query(`CALL deliveries(
    :query_type,
    :delivery_id,
    :driver_id,
    :vehicle_id,
    :destination,
    :status,
    :scheduled_date,
    :delivery_date
  )`, {
    replacements: {
      query_type: 'update',
      delivery_id,
      driver_id,
      vehicle_id,
      destination,
      status,
      scheduled_date,
      delivery_date
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

// Delete Delivery
module.exports.deleteDelivery = (req, res) => {
  const { delivery_id } = req.params;

  db.sequelize.query(`CALL deliveries(
    :query_type,
    :delivery_id,
    NULL, NULL, NULL, NULL, NULL, NULL
  )`, {
    replacements: {
      query_type: 'delete',
      delivery_id
    },
    type: db.Sequelize.QueryTypes.CALL
  })
  .then((resp) => {
    res.status(200).json({ success: true, message: 'Delivery deleted successfully.' });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  });
};
