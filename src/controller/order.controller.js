const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");
const { timeStamp } = require("../utils/timestamp");

exports.bookProduct = async (req, res) => {
  const products = await getDb().collection("booked");

  const { buyerId, productId, ...rest } = req.body;

  const result = await products.insertOne({
    ...rest,
    productId: ObjectId(productId),
    buyerId: ObjectId(buyerId),
    createdAt: timeStamp(),
  });
  res.send(result);
};

exports.myOrders = async (req, res) => {
  const bookings = await getDb().collection("booked");
  const id = decoded.id;

  const result = await bookings.find({ buyerId: ObjectId(id) }).toArray();

  res.send(result);
};
