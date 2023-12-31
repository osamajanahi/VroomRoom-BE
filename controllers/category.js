const {Category} = require('../models/Category');
const fs = require("fs");
const uploadCloudinary = require('../config/cloudinaryConfig');


exports.category_create_post = (req, res) => {
    console.log(req.file);
    console.log(req.body);
    let cate = new Category(req.body);
    if (req.file) {
        let image = `public/images/${req.file.filename}`;
        console.log(image);
        uploadCloudinary.upload_single(image)
        .then(imagePath =>{
            console.log(imagePath.url)
            cate.image = imagePath.url;
            cate.save()
            .then(newCate =>{
                fs.unlink(image, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('File is deleted.');
                    }
                    });
                    res.json(newCate);
            })
            .catch(err =>{
                console.log(err);
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }
    console.log(req.body);
    let category = new Category(req.body);
    // Save category
    category.save()
    .then(() => {
    res.json({ category })
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!")
    })
}

exports.category_index_get = (req, res) => {
    Category.find()
    .then((category) => {
        res.json({ category })
    })
    .catch((err) => {
        console.log(err);
    })

}

exports.category_edit_post = (req, res) => {
    console.log(req.body._id);
    Category.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((category) => {
        res.json(category);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.category_delete_get = (req, res) => {
    console.log(req.query.id);
    Category.findByIdAndDelete(req.query.id)
    .then((category) => {
        res.json({ category });
    })
    .catch((err) => {
        console.log(err);
    })
}

// This will be used for both show and get category for edit
exports.category_detail_get = (req, res) => {
    Category.findById(req.query.id)
    .then((category) => {
        res.json({category})
    })
    .catch((err) => {
        console.log(err);
    })
}