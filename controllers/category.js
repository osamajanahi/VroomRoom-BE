const {Category} = require('../models/Category');
const fs = require("fs");
const uploadCloudinary = require('../config/cloudinaryConfig');


exports.category_create_post = async (req, res) => {
    // Create a new Category instance with the request body data
    let category = new Category(req.body);

    // If there's a file in the request, process it for Cloudinary upload
    if (req.file) {
        let image = `public/images/${req.file.filename}`;
        try {
            let imagePath = await uploadCloudinary.upload_single(image);
            category.image = imagePath.url; // Set the image URL to the category

            // Remove the local file after uploading to Cloudinary
            fs.unlink(image, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Local file deleted after Cloudinary upload.');
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Error uploading image. Please try again later.");
        }
    }

    // Save the category (with or without the image)
    try {
        let savedCategory = await category.save();
        res.json({ category: savedCategory });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving category. Please try again later.");
    }
}


exports.category_index_get = (req, res) => {
    Category.find().populate("post")
    .then((category) => {
        res.json(category)
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