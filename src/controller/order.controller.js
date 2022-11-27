const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");
const { timeStamp } = require("../utils/timestamp");

exports.bookProduct = async (req, res) => {
  const products = await getDb().collection("booked");

  const { sellerId, buyerId, productId, ...rest } = req.body;

  const result = await products.insertOne({
    ...rest,
    productId: ObjectId(productId),
    buyerId: ObjectId(buyerId),
    sellerId: ObjectId(sellerId),
    createdAt: timeStamp(),
  });
  res.send(result);
};

exports.addToWish = async (req, res) => {
  const products = await getDb().collection("WishList");

  const id = req.decoded.id;
  const { wishedProduct, sellerId } = req.body;

  const data = {
    sellerId: ObjectId(sellerId),
    buyerId: ObjectId(req.decoded.id),
    wishedProduct: ObjectId(wishedProduct),
    createdAt: timeStamp(),
  };
  const result = await products.insertOne(data);
  res.send(result);
};

exports.myWishList = async (req, res) => {
  const products = await getDb().collection("WishList");
  const id = req.decoded.id;
  const result = await products
    .aggregate([
      {
        $match: {
          buyerId: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "product",
          localField: "wishedProduct",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "buyerId",
          foreignField: "_id",
          as: "buyerDetails",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "sellerId",
          foreignField: "_id",
          as: "sellerDetails",
        },
      },
    ])
    .toArray();
  res.send(result);
};

exports.myOrders = async (req, res) => {
  const bookings = await getDb().collection("booked");
  const id = req.decoded.id;
  // const result = await bookings.find({ buyerId: ObjectId(id) }).toArray();
  const result = await bookings
    .aggregate([
      {
        $match: {
          buyerId: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "product",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
    ])
    .toArray();
  res.send(result);
};
