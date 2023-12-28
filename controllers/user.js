const {User} = require('../models/User');


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
    User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect("/user/index");
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