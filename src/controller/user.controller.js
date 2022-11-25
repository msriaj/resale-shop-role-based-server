const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");

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
    console.log(result);
    return res.status(200).send("inserted success");
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

exports.verifyUser = async (req, res) => {
  const User = await getDb().collection("user");
  const result = await User.updateOne(
    { _id: ObjectId(req.params.id) },
    {
      $set: { verify: true },
    }
  );
  res.send(result);
};
