const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");

exports.apiCheck = async (req, res) => {
  const User = await getDb().collection("user");

  await User.insertOne({ name: "bokkor" });

  res.send("ok");
};

exports.mobile = async (req, res) => {
  const product = await Product();
  product.insertOne({ nam: "s" });
  await Product();
  res.send("ok");
};

exports.addUser = async (req, res) => {
  const User = await getDb().collection("user");
  const result = await User.insertOne(req.body);
  res.send(result);
};

exports.googleUser = async (req, res) => {
  const User = await getDb().collection("user");
  const findUser = await User.findOne({ email: req.body.email });
  if (!findUser) {
    const result = await User.insertOne(req.body);
    res.status(200).send("inserted success");
  }
  res.send(findUser);
};

exports.checkRole = async (req, res) => {
  const User = await getDb().collection("user");
  const findUser = await User.findOne({ email: req.query.email });
  res.send(findUser);
};

exports.showUser = async (req, res) => {
  const User = await getDb().collection("user");
  const findUser = await User.find({}).toArray();
  res.send(findUser);
};

exports.deleteUser = async (req, res) => {
  const User = await getDb().collection("user");
  const findUser = await User.deleteOne({ _id: ObjectId(req.params.id) });
  res.send(findUser);
};
