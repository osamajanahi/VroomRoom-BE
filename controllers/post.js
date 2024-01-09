const {Post} = require('../models/Post');
const {Category} = require('../models/Category');
const fs = require("fs");
const uploadCloudinary = require('../config/cloudinaryConfig');

exports.post_create_post = async (req, res) => {
    let post = new Post(req.body)
    let images;
    console.log("fffffff")
    console.log(req)
    if (req.files) {
        images = req.files.map(file => `public/images/${file.filename}`);
    } else {
        images = [];
    }
    console.log(images)
    let pathDb = [];
    await uploadCloudinary.upload_multiple(images)
        .then((imagesPath)=>{
        //     console.log("this is the log from Cloud")
        imagesPath.forEach(pathImg =>{
            console.log(pathImg.url)
            pathDb.push(pathImg.url);
        })
        console.log(pathDb)
        post.image = pathDb;
        post.save()
        .then(newPost =>{
            images.forEach(remove =>{
                // To remove the image from public/images and store it in cloudinary only
                fs.unlink(remove, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('File is deleted.');
                    }
                    });    
            })
                Category.findById(req.body.category)
                .then((category) => {
                    category.post.push(post);
                    category.save();
                })
                .catch((err) => {
                    console.log(err);
                });

    
            res.json(newPost)
        })
        })
        .catch((err)=>{
            console.log(err)
        })    

}  

exports.post_index_get = (req, res) => {
    Post.find().populate('category')
    .then((post) => {
        res.json({ post })
    })
    .catch((err) => {
        console.log(err);
    })

}

exports.get_mypost_get = (req, res) =>{
    Post.find({user:req.query.user})
    .then(myPosts =>{
        res.json(myPosts);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.post_edit_post = async (req, res) => {
    console.log(req.body)
    if(req.files && req.files.length != 0){
        let images;
        let pathDb = [];
        images = req.files.map(file => `public/images/${file.filename}`);
        await uploadCloudinary.upload_multiple(images)
        .then((imagesPath) =>{
            imagesPath.forEach(pathImg =>{
                console.log(pathImg.url)
                pathDb.push(pathImg.url);
            })
            images.forEach(remove =>{
                // To remove the image from public/images and store it in cloudinary only
                fs.unlink(remove, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('File is deleted.');
                    }
                    });    
            })
            Category.findById(req.body.category)
            .then((category) => {
                category.post.push(post);
                category.save();
            })
            .catch((err) => {
                console.log(err);
            });
            const body = req.body;
            // console.log(pathDb);
            body.image = pathDb;
            console.log(body.image)
            Post.findByIdAndUpdate(req.body._id, body, {new: true})
            .then((newPost) => {
                console.log(newPost)
                res.json(newPost);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('Internal Server Error');
            });
        })
        .catch((err) =>{
            console.log(err);
        })    
    
    }
    else{
        console.log('not image')
        Post.findByIdAndUpdate(req.body._id, req.body, {new: true})
        .then((newPost) => {
            console.log(newPost)
            res.json(newPost);
        })
        .catch((err)=>{
            console.log(err)
        })
        } 
    
}


exports.post_delete_get = (req, res) => {
    console.log(req.query.id);
    Post.findByIdAndDelete(req.query.id)
    .then((post) => {
        res.json({ post });
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.post_detail_get = (req, res) => {
    Post.findById(req.query.id).populate('category')
    .then((post) => {
        res.json({post})
    })
    .catch((err) => {
        console.log(err);
    })
}