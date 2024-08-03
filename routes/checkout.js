const express = require("express");
const router = express.Router();
const { isNotLoggedIn, isLoggedIn } = require("../middlewares");

module.exports = router;
