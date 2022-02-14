const express = require('express');
const route = express.Router();

const multer = require('multer');
const upload = multer();

const userController = require('../controller/userController');

route.get('/register', (req, res) => {
    res.render("register");
});

route.get('/login', (req, res) => {
    res.render("login");
});

route.post('/register',upload.none(), userController.userRegister);
route.post('/login', upload.none(), userController.userLogin);

route.get('/logout', userController.userLogout);

module.exports = route;