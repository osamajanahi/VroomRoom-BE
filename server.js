// server.js
// Require dependencies
const express = require('express');
const expressLayout = require('express-ejs-layouts');
require('dotenv').config()
const cors = require('cors');

// connect to mongoDB
require('./config/db')

// initialize express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// get the port number form .env file, if undefined, 3000
const port = process.env.PORT || 3000


//  Middlewares
// Templating Engine
app.set('view engine', 'ejs');
app.use(expressLayout);

// to encode req.body - make form data readable in controllers
app.use(express.urlencoded({ extended: true }));

// link you static folder i.e. images, css 
app.use(express.static('public'));
//-------------------------//

const indexRouter = require("./routes/index");
const postRouter = require("./routes/post");
const wishlistRouter = require("./routes/wishlist");
const categoryRouter = require("./routes/category");
const userRouter = require('./routes/user');
const authRouter = require("./routes/auth");

//------- Mount routes -------//
// Your code goes here

app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/wishlist", wishlistRouter);
app.use('/auth', authRouter);

//-------------------------//

// start listening to requests coming from the PORT
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
