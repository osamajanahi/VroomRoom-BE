const {Post} = require('../models/Post');

exports.post_create_post = (req, res) => {
    console.log(req.body);
    let post = new Post(req.body);
    // Save Post
    post.save()
    .then(() => {
    res.json({ post })
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!")
    })
}

exports.post_index_get = (req, res) => {
    Post.find()
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