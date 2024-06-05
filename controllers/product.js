const Product = require("../models/product");

exports.uploadProduct = async (req, res, next) => {
  try {
    console.log("ProductReq", req);
    // const product = await Product.create({
    //   name: req.body.name,
    // })
  } catch (error) {
    console.error(error);
    next(error);
  }
};
