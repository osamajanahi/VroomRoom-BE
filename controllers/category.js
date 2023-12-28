const {Category} = require('../models/Category');

exports.category_create_post = (req, res) => {
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

exports.category_edit_get = (req, res) => {
    Category.findById(req.query.id)
    .then((category) => {
        res.json({ category });
    })
    .catch(err => {
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

exports.category_show_get = (req, res) => {
    console.log(req.query.id);
    Category.findById(req.query.id)
    .then((category) => {
        // res.render("author/detail", {category})
        res.json({category})
    })
    .catch((err) => {
        console.log(err);
    })
}