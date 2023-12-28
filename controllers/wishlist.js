const {Whishlist, Wishlist} = require('../models/Wishlist');

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

  exports.wish_edit_get = (req, res) => {
    Wish.findById(req.query.id)
    .then((wish) => {
      // res.render("wish/edit", {wish});
      res.json({wish})
    })
    .catch(err => {
      console.log(err);
    })
  }
   
  exports.wish_update_put = (req, res) => {
    console.log(req.body._id);
    Wish.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((wish) => {
      // res.redirect("/wish/index");
      res.json({wish})
    })
    .catch(err => {
      console.log(err);
    })
  }
  