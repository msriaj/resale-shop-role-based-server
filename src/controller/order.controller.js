const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");
const { timeStamp } = require("../utils/timestamp");
require("dotenv").config();

const stripe = require("stripe")(
  "sk_test_51M8qENL39Ynj9W9LNxVcZjHul6AJOu3wpBvwONekzwqtpDGhS0UJRu9Eq2Lo27CidYSxMK4PPA1JMGM0TCDFIrq900C24wHGHp"
);

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

  const { id } = req.decoded;
  console.log("addToWish", id);
  const { wishedProduct, sellerId } = req.body;

  const data = {
    sellerId: ObjectId(sellerId),
    buyerId: ObjectId(id),
    wishedProduct: ObjectId(wishedProduct),
    createdAt: timeStamp(),
  };
  const result = await products.insertOne(data);
  res.send(result);
};

exports.myWishList = async (req, res) => {
  const products = await getDb().collection("WishList");
  const id = await req.decoded.id;
  console.log(id);
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
  const { id } = req.decoded;

  const result = await bookings
    .aggregate([
      {
        $match: {
          buyerId: ObjectId(id),
        },
      },
      {
        $sort: { createdAt: -1 },
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

exports.book = async (req, res) => {
  const booking = await getDb().collection("booked");
  console.log(req.params.id);
  const result = await booking.findOne({ _id: ObjectId(req.params.id) });
  res.send(result);
};

exports.paymentIntent = async (req, res) => {
  const booking = req.body;
  const amount = parseInt(booking.resalePrice);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

exports.sold = async (req, res) => {
  const User = await getDb().collection("product");
  const result = await User.updateOne(
    { _id: ObjectId(req.params.id) },
    {
      $set: { status: "sold" },
    }
  );
  res.send(result);
};
