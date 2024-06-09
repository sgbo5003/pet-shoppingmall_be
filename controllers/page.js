const Category1 = require("../models/category1");
const Category2 = require("../models/category2");
const Product = require("../models/product");

exports.getCategory1List = async (req, res, next) => {
  // GET category1 list
  try {
    const category1 = await Category1.findAll({
      attributes: ["id", "name"],
      where: { useYn: "Y" },
    });
    res.json(category1);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.getCategory2List = async (req, res, next) => {
  // GET category2 list
  try {
    const category2 = await Category2.findAll({
      attributes: ["id", "name"],
      where: { Category1Id: req.params.id, useYn: "Y" },
    });
    res.json(category2);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.getNewProductList = async (req, res, next) => {
  try {
    const newProduct = await Product.findAll({
      attributes: ["id", "name", "img1", "price"],
    });
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 라우터 -> 컨트롤러 -> 서비스
