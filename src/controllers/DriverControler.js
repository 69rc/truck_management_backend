const { default: db } = require('../models');

module.exports.manageDriver = async (req, res) => {
  const {
    query_type,
    driver_id,
    name,
    nin,
    phone,
    email,
    address,
    dob,
    state,
    lga,
    next_of_kin,
    vehicle_id
  } = req.body;

  try {
    const result = await db.sequelize.query(
      `CALL drivers(
        :query_type,
        :driver_id,
        :name,
        :nin,
        :phone,
        :email,
        :address,
        :dob,
        :state,
        :lga,
        :next_of_kin,
        :vehicle_id
      )`,
      {
        replacements: {
          query_type,
          driver_id,
          name,
          nin,
          phone,
          email,
          address,
          dob,
          state,
          lga,
          next_of_kin,
          vehicle_id
        },
        type: db.Sequelize.QueryTypes.CALL,
      }
    );

    if (query_type === 'insert') {
      res.status(201).json({ success: true, message: 'Driver added successfully.', data: result });
    } else if (query_type === 'select') {
      if (result && result.length > 0) {
        res.status(200).json({ success: true, data: result[0] });
      } else {
        res.status(404).json({ success: false, message: 'Driver not found.' });
      }
    } else if (query_type === 'update') {
      res.status(200).json({ success: true, message: 'Driver updated successfully.', data: result });
    } else if (query_type === 'delete') {
      res.status(200).json({ success: true, message: 'Driver deleted successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid query_type provided.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while processing the request.' });
  }
};
