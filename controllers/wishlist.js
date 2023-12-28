const {Whishlist} = require('../models/Wishlist');

  //restful API
  exports.wish_create_post = (req, res) => {
    console.log(req.body);
    let wish = new Wish(req.body);
  
    // Save Wish
    wish.save()
    .then((wish) => {
      // res.redirect("/wish/index");
      res.json({ wish})
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later!!")
    })
  }
  
exports.wish_delete_get = (req, res) => {
    console.log(req.query.id);
    Wish.findByIdAndDelete(req.query.id)
    .then(() => {
      // res.redirect("/wish/index");
      res.json({ Wish })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  