const {Post} = require('../models/Post');
const {Category} = require('../models/Category');
const fs = require("fs");
const uploadCloudinary = require('../config/cloudinaryConfig');

exports.post_create_post = async (req, res) => {
    let post = new Post(req.body)
    let images;
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

    // console.log(req.file);
    // console.log(req.body);
    // let post = new Post(req.body);
    // if (req.file) {
    //     let image = `public/images/${req.file.filename}`;
    //     console.log(image);
    //     uploadCloudinary.upload_single(image)
    //     .then(imagePath =>{
    //         console.log(imagePath.url)
    //         post.image = imagePath.url;
    //         post.save()
    //         .then(newPost =>{
    //             fs.unlink(image, (err) => {
    //                 if (err) {
    //                     console.error(err);
    //                 } else {
    //                     console.log('File is deleted.');
    //                 }
    //                 });
    //                 res.json(newPost);
    //         })
    //         .catch(err =>{
    //             console.log(err);
    //         })
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     })
    // }
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

exports.post_edit_post = (req, res) => {
    console.log(req.body._id);
    Post.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((post) => {
        res.json(post);
    })
    .catch(err => {
        console.log(err);
    })
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
    Post.findById(req.query.id)
    .then((post) => {
        res.json({post})
    })
    .catch((err) => {
        console.log(err);
    })
}