const express = require("express");
const router = express.Router();
const {
  renderJoin,
  renderMain,
  getCategory1List,
  getCategory2List,
} = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/category1", isNotLoggedIn, getCategory1List);
router.get("/category2/:id", isNotLoggedIn, getCategory2List);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

module.exports = router;
