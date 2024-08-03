const express = require("express");
const router = express.Router();
const {
  getCategory1List,
  getCategory2List,
  getNewProductList,
  getProductDetail,
  getUserWallet,
  updateUserWalletPoint,
  getSessionStatus,
} = require("../controllers/page");
const { isNotLoggedIn, isLoggedIn } = require("../middlewares");

router.use((req, res, next) => {
  res.locals.user = req.user;
  // console.log("req.user", req.user);
  next();
});

router.get("/session/status", getSessionStatus);
router.get("/category1", isLoggedIn, getCategory1List);
router.get("/category2/:id", isLoggedIn, getCategory2List);
router.get("/product/new", getNewProductList);
router.get("/product/:id", getProductDetail);
router.get("/userWallet/:id", isLoggedIn, getUserWallet);
router.patch("/userWallet/point/:id", isLoggedIn, updateUserWalletPoint);

module.exports = router;
