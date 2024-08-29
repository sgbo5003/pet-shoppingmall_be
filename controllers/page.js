const { Sequelize } = require("sequelize");
const Category1 = require("../models/category1");
const Category2 = require("../models/category2");
const Order = require("../models/order");
const Orderer = require("../models/orderer");
const OrderItem = require("../models/orderItem");
const Product = require("../models/product");
const Shipping = require("../models/shipping");
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
exports.getBestProductList = async (req, res, next) => {
  try {
    const bestProduct = await OrderItem.findAll({
      attributes: [
        "ProductId",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalSold"],
      ],
      include: [
        {
          model: Product,
          attributes: [
            "id",
            "name",
            "img1",
            "regular_price",
            "price",
            "delivery_fee",
          ],
        },
      ],
      group: ["ProductId", "Product.id", "Product.name"],
      order: [[Sequelize.literal("totalSold"), "DESC"]],
      limit: 5,
    });
    bestProduct.map((product) => ({
      id: product.Product.id,
      name: product.Product.name,
      totalSold: product.dataValues.totalSold,
    }));
    res.json(bestProduct);
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
exports.checkoutProduct = async (req, res, next) => {
  const {
    name,
    address,
    orderPhone1,
    orderPhone2,
    email,
    shippingName,
    shippingAddress,
    shippingPhone1,
    shippingPhone2,
    request,
    quantity,
    price,
    productId,
  } = req.body;
  try {
    console.log("reqBody", req.body);
    const newOrder = await Order.create({
      status: "Paid",
      UserId: req.user.id,
    });
    const orderId = newOrder.id;
    await Orderer.create({
      name,
      address,
      phone1: orderPhone1,
      phone2: orderPhone2,
      email,
      OrderId: orderId,
    });
    await Shipping.create({
      name: shippingName,
      address: shippingAddress,
      phone1: shippingPhone1,
      phone2: shippingPhone2,
      request,
      OrderId: orderId,
    });
    await OrderItem.create({
      quantity,
      price,
      OrderId: orderId,
      ProductId: productId,
    });
    return res.status(200).send("상품 주문 성공");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 라우터 -> 컨트롤러 -> 서비스
