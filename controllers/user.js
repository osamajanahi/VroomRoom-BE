const {User} = require('../models/User');


exports.user_show_get = (req, res) => {
    console.log(req.query.id);
    user.findById(req.query.id)
    .then((user) => {
        res.json({user})
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.user_update_put = (req, res) => {
    console.log(req.body.id);
    user.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect("/user/index");
    })
    .catch(err => {
      console.log(err);
    })
}