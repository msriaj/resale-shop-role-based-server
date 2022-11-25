const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");

exports.addProduct = async (req, res) => {
  const products = await getDb().collection("product");
  const result = await products.insertOne(req.body);
  res.send(result);
};

exports.products = async (req, res) => {
  const products = await getDb().collection("product");
  const result = await products.find({}).toArray();
  res.send(result);
};
