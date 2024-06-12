const Product = require("../models/product");

exports.uploadProduct = async (req, res, next) => {
  const {
    name,
    company,
    origin,
    category1Id,
    category2Id,
    regular_price,
    price,
    delivery_fee,
  } = req.body;
  try {
    console.log("reqBody", req.body);
    // console.log("reqFiles", req.files);
    // console.log("reqFiles1", req.files[0].filename);
    // console.log("reqFiles22", req.files[1]);
    // console.log(
    //   "reqFiles2",
    //   req.files[1] === undefined ? null : req.files[1].filename
    // );
    // console.log(
    //   "reqFiles3",
    //   req.files[2] === undefined ? null : req.files[2].filename
    // );
    await Product.create({
      name,
      img1: req.files[0].filename,
      img2: req.files[1] === undefined ? null : req.files[1].filename,
      img3: req.files[2] === undefined ? null : req.files[2].filename,
      company,
      origin,
      Category1Id: category1Id,
      Category2Id: category2Id,
      regular_price,
      price,
      delivery_fee,
      UserId: req.user.id,
    });
    return res.status(200).send("상품 등록 성공");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
