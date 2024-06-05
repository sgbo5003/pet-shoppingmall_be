const express = require("express");
const router = express.Router();
const { getCategory1List, getCategory2List } = require("../controllers/page");
const { isNotLoggedIn } = require("../middlewares");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/category1", isNotLoggedIn, getCategory1List);
router.get("/category2/:id", isNotLoggedIn, getCategory2List);

module.exports = router;
