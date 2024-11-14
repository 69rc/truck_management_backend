const { default: db } = require('../models');

module.exports.createTruck = (req, res) => {
  const { truck_id,license_plate, model, make, year, status, capacity } = req.body;

  if (!license_plate || !model || !make || !year || !status || !capacity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.sequelize.query(
    'CALL trucks(:query_type, :truck_id,:license_plate, :model, :make, :year, :status, :capacity)',
    {
      replacements: {
        query_type: 'insert',
        truck_id,
        license_plate,
        model,
        make,
        year,
        status,
        capacity,
      },
      type: db.Sequelize.QueryTypes.CALL
    }
  )
  .then((resp) => {
    res.status(200).json({ success: true, data: resp });
})
.catch(err => {
    console.error(err);
    res.status(500).json({ success: false, error: err });
});
};

module.exports.getTruckById = (req, res) => {
  const { truck_id } = req.params;

  db.sequelize.query(
    'CALL do_for_trucks(:query_type, :truck_id)',
    {
      replacements: {
        query_type: 'select',
        truck_id,
      },
      type: db.Sequelize.QueryTypes.CALL
    }
  ).then((resp) => {
    res.status(200).json({ success: true, data: resp });
})
.catch(err => {
    console.error(err);
    res.status(500).json({ success: false, error: err });
});
};

module.exports.updateTruck = (req, res) => {
  const { truck_id } = req.params;
  const { license_plate, model, make, year, status, capacity } = req.body;

  db.sequelize.query(
    'CALL do_for_trucks(:query_type, :truck_id, :license_plate, :model, :make, :year, :status, :capacity)',
    {
      replacements: {
        query_type: 'update',
        truck_id,
        license_plate,
        model,
        make,
        year,
        status,
        capacity,
      },
      type: db.Sequelize.QueryTypes.CALL
    }
  ).then((resp) => {
    res.status(200).json({ success: true, data: resp });
})
.catch(err => {
    console.error(err);
    res.status(500).json({ success: false, error: err });
});
};

module.exports.deleteTruck = (req, res) => {
  const { truck_id } = req.params;

  db.sequelize.query(
    'CALL do_for_trucks(:query_type, :truck_id)',
    {
      replacements: {
        query_type: 'delete',
        truck_id,
      },
      type: db.Sequelize.QueryTypes.CALL
    }
  ).then((resp) => {
    res.status(200).json({ success: true, data: resp });
})
.catch(err => {
    console.error(err);
    res.status(500).json({ success: false, error: err });
});
};
