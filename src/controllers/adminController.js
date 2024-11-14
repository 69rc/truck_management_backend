import bcrypt from 'bcryptjs';
const { default: db } = require('../models');

module.exports.createAdmin = (req, res) => {
  const {
    query_type = 'insert',
    admin_id = null,
    name = null,
    phone = null,
    email = null,
    role = null,
    password = null
  } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Name, email, password, and role are required.' });
  }

  db.sequelize.query(`CALL admins(
    :query_type,
    :admin_id,
    :name,
    :phone,
    :email,
    :role,
    :password
  )`, {
    replacements: {
      query_type,
      admin_id,
      name,
      phone,
      email,
      role,
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
};

module.exports.getAdmin = (req, res) => {
  const { admin_id } = req.params;

  if (!admin_id) {
    return res.status(400).json({ success: false, message: 'Admin ID is required.' });
  }

  db.sequelize.query(
    `CALL admins(
      :query_type,
      :admin_id,
      NULL, NULL, NULL, NULL, NULL
    )`,
    {
      replacements: {
        query_type: 'select',
        admin_id
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

module.exports.updateAdmin = (req, res) => {
  const { admin_id } = req.params;

  const {
    name = null,
    phone = null,
    email = null,
    role = null,
    password = null
  } = req.body;

  if (!admin_id) {
    return res.status(400).json({ success: false, message: 'Admin ID is required.' });
  }

  if (!name && !phone && !email && !role && !password) {
    return res.status(400).json({ success: false, message: 'At least one field (name, phone, email, role, password) is required to update.' });
  }

  const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;

  db.sequelize.query(
    `CALL admins(
      :query_type,
      :admin_id,
      :name,
      :phone,
      :email,
      :role,
      :password
    )`,
    {
      replacements: {
        query_type: 'update',
        admin_id,
        name,
        phone,
        email,
        role,
        password: hashedPassword
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



module.exports.deleteAdmin = (req, res) => {
  const { admin_id } = req.params;

  if (!admin_id) {
    return res.status(400).json({ success: false, message: 'Admin ID is required.' });
  }

  db.sequelize.query(
    `CALL admins(
      :query_type,
      :admin_id,
      NULL, NULL, NULL, NULL, NULL
    )`,
    {
      replacements: {
        query_type: 'delete',
        admin_id
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
