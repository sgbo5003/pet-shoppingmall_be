const express = require("express");
const router = express.Router();
const {
  getCategory1List,
  getCategory2List,
  getNewProductList,
} = require("../controllers/page");
const { isNotLoggedIn, isLoggedIn } = require("../middlewares");

router.use((req, res, next) => {
  res.locals.user = req.user;
  // console.log("req.user", req.user);
  next();
});

router.get("/category1", isLoggedIn, getCategory1List);
router.get("/category2/:id", isLoggedIn, getCategory2List);
router.get("/product/new", isNotLoggedIn, getNewProductList);

module.exports = router;
