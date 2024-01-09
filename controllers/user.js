const {User} = require('../models/User');
const bcrypt = require("bcrypt");
const salt = 10;
const fs = require("fs");
const uploadCloudinary = require('../config/cloudinaryConfig');


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

exports.user_update_post = async (req, res) => {
    console.log("this is post",req.body._id);
    console.log(req.body);

  if(req.body.password){

    // Create Hashed Password for User
    let hash = bcrypt.hashSync(req.body.password, salt);

    // Assign user password to the hashed password
    req.body.password = hash;
    console.log(req.body.password)

}
if (req.file) {
  let image = `public/images/${req.file.filename}`;
  req.body.image = await uploadCloudinary.upload_single(image)
  .then((imagePath) =>{
      console.log("in")
      const updateFields = {image: imagePath.url};
      console.log(imagePath.url)
        fs.unlink(image, (err) => {
          if (err) {
              console.error(err);
          } else {
              console.log('File is deleted.');
          }
          });
          return imagePath.url
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send('Internal Server Error');
      })
}
  User.findByIdAndUpdate(req.body._id, req.body, {new: true})
  .then((updated) => {
    // console.log(updated)
    res.json(updated);
  })
  .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
  });
}

//     User.findByIdAndUpdate(req.body.id, req.body)
//     .then(({user}) => {
//       res.json({user});
//     })
//     .catch(err => {
//       console.log(err);
//     })


exports.admin_users_get = (req, res) =>{
  User.find()
  .then((user) => {
      res.json({ user })
  })
  .catch((err) => {
      console.log(err);
  })
}

exports.admin_delete_get = (req, res) =>{
  console.log(req.query.id);
  User.findByIdAndDelete(req.query.id)
  .then((user) => {
      res.json({ user });
  })
  .catch((err) => {
      console.log(err);
  })
}

exports.user_type_get = (req, res) =>{
  User.findById(req.query.id)
  .then((user) => {
    console.log(req.query.id)
    res.json({ user });
})
.catch((err) => {
    console.log(err);
})
}
