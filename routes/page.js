const express = require("express");
const router = express.Router();
const { renderJoin, renderMain } = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

module.exports = router;
