const express = require("express");
const route = express.Router();
const aboutController = require("../controller/aboutController");
route.get("/", aboutController.aboutpg);

module.exports = route;
