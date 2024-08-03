const Category1 = require("../models/category1");
const Category2 = require("../models/category2");
const Product = require("../models/product");
const UserWallet = require("../models/userWallet");

exports.getSessionStatus = async (req, res, next) => {
  // check session status
  try {
    if (req.isAuthenticated()) {
      res.send({ loggedIn: true, user: req.user });
    } else {
      res.send({ loggedIn: false });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
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
  console.log("req", req.session);
  try {
    const newProduct = await Product.findAll({
      attributes: [
        "id",
        "name",
        "img1",
        "regular_price",
        "price",
        "delivery_fee",
      ],
    });
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.getProductDetail = async (req, res, next) => {
  try {
    const productDetail = await Product.findOne({
      where: { id: req.params.id },
    });
    let imgFiles = [];
    Object.keys(productDetail.dataValues).map((key) => {
      if (key.startsWith("img")) {
        imgFiles = imgFiles.concat(productDetail.dataValues[key]);
      }
    });
    imgFiles = imgFiles.filter((el) => el != null);
    productDetail.dataValues["imgFiles"] = imgFiles;
    res.json(productDetail);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUserWallet = async (req, res, next) => {
  // GET user wallet
  try {
    const userWallet = await UserWallet.findOne({
      where: { id: req.params.id },
    });
    res.json(userWallet);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.updateUserWalletPoint = async (req, res, next) => {
  // POST user wallet point
  const { point } = req.body;
  console.log("pointType", typeof point);
  try {
    const userPoint = await UserWallet.findOne({
      where: { id: req.params.id },
    });
    console.log("userPoint", userPoint.point);
    userPoint.point += point;
    await UserWallet.update(
      { point: userPoint.point },
      {
        where: { UserId: req.params.id },
      }
    );
    return res.status(200).send(`${point} 포인트 충전 성공`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 라우터 -> 컨트롤러 -> 서비스
