const {Wishlist} = require('../models/Wishlist');


//restful API
exports.wish_create_post = (req, res) => {
    Wishlist.find()
    .then(wish =>{
      wish.forEach(wishlist =>{
        // req.body.user will be input of type hidden in the frontend
        if(wishlist.user == req.body.user){
          if(wishlist.post.indexOf(req.body.post) == -1){
            wishlist.post.push(req.body.post);
            wishlist.save();
            res.json(wishlist);
          }
          else{
            res.json(wishlist);
          }
        }
      })
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later!")
    })
}
  
exports.wish_delete_get = (req, res) => {
// postId and wishId are hidden from frontend
  console.log(req.body.postId);
  console.log(req.body.wishId);
  Wishlist.findById(req.body.wishId)
  .then(wish =>{
    let postIndex = wish.post.indexOf(req.body.postId);
    if(postIndex != -1){
      console.log(postIndex)
      wish.post.splice(postIndex, 1);
      wish.save();
      res.json(wish);
    }
    else{
      res.json(wish);
    }
  })
  .catch(err =>{
    console.log(err);
  })
  //
}

exports.wish_show_get = (req, res) => {
  console.log("init")
  Wishlist.find()
  .then(wish =>{
    wish.forEach(wishlist =>{
      // req.body.user will be input of type hidden in the frontend
      if(wishlist.user == req.query.id){
        res.json(wishlist.post);
      }
    })
  })
  .catch(err => {
    console.log(err);
  })
}