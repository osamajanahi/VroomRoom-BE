const {Wishlist} = require('../models/Wishlist');


//restful API
exports.wish_create_post = (req, res) => {
    Wishlist.find()
    .then(wish =>{
      wish.forEach(wishlist =>{
        // req.body.user will be input of type hidden in the frontend
        if(wishlist.user == req.body.user){
          wishlist.post.push(req.body.post);
          wishlist.save();
        }
      })
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later!")
    })
}
  
exports.wish_delete_get = (req, res) => {
    console.log(req.query.id);
    Wishlist.findByIdAndDelete(req.query.id)
    .then(() => {
      res.json({Wish})
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.wish_edit_get = (req, res) => {
    Wishlist.findById(req.query.id)
    .then((wish) => {
      res.json({wish})
    })
    .catch(err => {
      console.log(err);
    })
}
   
exports.wish_update_put = (req, res) => {
    console.log(req.body._id);
    Wishlist.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((wish) => {
      res.json({wish})
    })
    .catch(err => {
      console.log(err);
    })
}