// RESTFUL APIs for Registration and Authenticaion

// Connect Controller with User model.
// 
const {User} = require("../models/User");
const {Wishlist} = require("../models/Wishlist");

const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");

// Signup POST API
exports.auth_signup_post = (req, res) => {
req.body.image = "http://res.cloudinary.com/dbk40zyi7/image/upload/v1704298449/ifneptovukziudhxiqic.jpg"
req.body.type = "user";
console.log(req.body);

    let user = new User(req.body);

    // Create Hashed Password for User
    let hash = bcrypt.hashSync(req.body.password, salt);

    //console.log(hash);

    user.password = hash;

    user.save()
    .then( (newUser) => {
      console.log(newUser);
      let wishlist = new Wishlist({user: newUser._id});
      wishlist.save();
        res.json({"message": "User Created Successfully!"});
    })
    .catch((err) => {
      console.log(err);
        res.json({"message": err.message});
    })
}


// Signin POST API
exports.auth_signin_post = async (req, res) => {
    let { emailAddress, password } = req.body;
    console.log(emailAddress);
  
    try{
      let user = await User.findOne({emailAddress});
      console.log(user);
  
      if(!user)
      {
        return res.json({"message": "User not found!"}).status(400);
      }
  
      // Password Comparison
      const isMatched = await bcrypt.compareSync(password, user.password);
      console.log(password);
      console.log(user.password);
  
      if(!isMatched) {
        return res.json({"message": "Password Not Matched!"}).status(400);
      }
  
      // Generate JWT
      const payload = {
        user: {
          id: user._id,
          type: user._type
        }
      }
  
      jwt.sign(
        payload,
        process.env.SECRET,
        {expiresIn: 36000000},
        (err, token) => {
          if (err) throw err;
          res.json({token}).status(200)
        }
      )
    }
    catch(err){
      console.log(err);
      res.json({"message": "You are not logged In!"}).status(400);
    }
  }