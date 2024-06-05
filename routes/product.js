const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { uploadProduct } = require("../controllers/product");

try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      console.log(file);
      const ext = path.extname(file.originalname); // 이미지.png -> 이미지123123.png
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/admin", isLoggedIn, upload.array("imgFiles"), uploadProduct);

module.exports = router;
