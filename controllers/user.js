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
    console.log(req.body.id);

  if(req.body.password){

    // Create Hashed Password for User

    let hash = bcrypt.hashSync(req.body.password, salt);

    // Assign user password to the hashed password
    req.body.password = hash;
}
if (req.file) {
  let image = `public/images/${req.file.filename}`;
  uploadCloudinary.upload_single(image)
  .then((imagePath) =>{
      // console.log(imagePath.url)
      // console.log(req.body)
      const updateFields = {image: imagePath.url};
      User.findByIdAndUpdate(req.body.id, updateFields)
      .then((updated) => {
        // To remove the image from public/images and store it in cloudinary only
        fs.unlink(image, (err) => {
          if (err) {
              console.error(err);
          } else {
              console.log('File is deleted.');
          }
          });
        res.json({updated});
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send('Internal Server Error');
      });        })
  .catch((err) =>{
      console.log(err);
  })    
}
else{
  User.findByIdAndUpdate(req.body.id, req.body)
  .then((updated) => {
    fs.unlink(image, (err) => {
      if (err) {
          console.error(err);
      } else {
          console.log('File is deleted.');
      }
      });
    res.json({updated});
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