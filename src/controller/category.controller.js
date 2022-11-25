const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");

exports.addCategory = async (req, res) => {
  const User = await getDb().collection("categories");
  const result = await User.insertOne(req.body);
  res.send(result);
};
exports.showCategories = async (req, res) => {
  const User = await getDb().collection("categories");
  const result = await User.find({}).toArray();
  res.send(result);
};

exports.deleteCategories = async (req, res) => {
  const data = await getDb().collection("categories");
  const result = await data.deleteOne({ _id: ObjectId(req.params.id) });
  res.send(result);
};
