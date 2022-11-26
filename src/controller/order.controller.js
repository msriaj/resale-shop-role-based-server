const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");
const { timeStamp } = require("../utils/timestamp");

exports.bookProduct = async (req, res) => {
  const products = await getDb().collection("booked");

  const { buyerEmail, productId, ...rest } = req.body;

  const result = await products.insertOne({
    ...rest,
    productId: ObjectId(productId),
    createdAt: timeStamp(),
  });
  res.send(result);
};
