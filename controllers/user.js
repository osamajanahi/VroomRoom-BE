const {User} = require('../models/User');
const bcrypt = require("bcrypt");
const salt = 10;

exports.user_show_get = (req, res) => {
    console.log(req.query.id);
    User.findById(req.query.id)
    .then((user) => {
        res.json({user})
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.user_update_put = (req, res) => {
    console.log(req.body.id);

    // Create Hashed Password for User
    let hash = bcrypt.hashSync(req.body.password, salt);

    // Assign user password to the hashed password
    req.body.password = hash;

    User.findByIdAndUpdate(req.body.id, req.body)
    .then(({user}) => {
      res.json({user});
    })
    .catch(err => {
      console.log(err);
    })
}

exports.admin_users_get = (req, res) =>{
  User.find()
  .then((user) => {
      res.json({ user })
  })
  .catch((err) => {
      console.log(err);
  })
}