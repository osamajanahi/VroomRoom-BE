const {Wishlist} = require('../models/Wishlist');

  //restful API
  exports.wish_create_post = (req, res) => {
    console.log(req.body);
    let wish = new Wishlist(req.body);
  
    // Save Wish
    wish.save()
    .then((wish) => {
      res.json({wish})
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later!")
    })
  }
  
exports.wish_delete_get = (req, res) => {
    console.log(req.query.id);
    Wish.findByIdAndDelete(req.query.id)
    .then(() => {
      res.json({Wish})
    })
    .catch((err) => {
      console.log(err);
    })
  }
  