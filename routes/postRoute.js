const express = require('express');
const route = express.Router();
const postController = require('../controller/postController');

route.get('/new', (req, res) => {
    res.render("create");
});

route.post('/new', postController.newPost);

route.get('/:id', postController.getPostById);

//route.post('edit/:id', upload.none(), postController.editPostById);
route.post('/delete/:id', postController.deletePostById);
module.exports = route;