const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");
const { createToken } = require("../utils/createToken");

exports.addUser = async (req, res) => {
  const User = await getDb().collection("user");
  const result = await User.insertOne(req.body);
  console.log(result);
  // generate token
  const token = await createToken({
    id: result.insertedId.toString(),
    email: req.body.email,
  });

  res.send({ token, role: req.body.role });
};

exports.googleUser = async (req, res) => {
  const User = await getDb().collection("user");

  const { email } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    const result = await User.insertOne(req.body);
    // generate token
    const token = await createToken({ id: result._id.toString(), email });

    return res
      .status(200)
      .send({ token, role: "buyers", msg: "inserted success" });
  }

  const checkRole = await User.findOne({ email: email });

  // generate token
  const token = await createToken({ id: findUser._id.toString(), email });

  res.send({ token, role: checkRole.role });
};

exports.getToken = async (req, res) => {
  try {
    const User = await getDb().collection("user");
    const { email } = req.body;
    if (!email) return res.status(400).send("Email is required !");

    const findUser = await User.findOne({ email });
    if (!findUser) return res.status(404).send("No User data found !");

    // generate token
    const token = await createToken({ id: findUser._id.toString(), email });

    const checkRole = await User.findOne({ email: email });
    console.log({ checkRole });
    res.send({ token, role: checkRole.role });
  } catch (error) {
    res.status(500).send(error.message);
  }
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
exports.showBuyers = async (req, res) => {
  const User = await getDb().collection("user");
  const findUser = await User.find({ role: "buyers" }).toArray();
  res.send(findUser);
};
exports.showSellers = async (req, res) => {
  const User = await getDb().collection("user");
  const findUser = await User.find({ role: "seller" }).toArray();
  res.send(findUser);
};

exports.deleteUser = async (req, res) => {
  const User = await getDb().collection("user");
  const Product = await getDb().collection("product");
  const booked = await getDb().collection("booked");
  const wish = await getDb().collection("WishList");

  const findUser = await User.deleteOne({ _id: ObjectId(req.params.id) });

  // delete all post of user
  const deleteCount = await Product.deleteMany({
    userID: ObjectId(req.params.id),
  });

  // delete all booking  of user
  const deleteBooking = await booked.deleteMany({
    buyerId: ObjectId(req.params.id),
  });

  // delete all wish  of user
  const deleteWish = await wish.deleteMany({
    buyerId: ObjectId(req.params.id),
  });

  res.send({ findUser, deleteCount });
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

exports.myBuyers = async (req, res) => {
  const booked = await getDb().collection("booked");
  const { id } = req.decoded;
  console.log("myBuyers", id);
  // const result = await booked.find({ sellerId: ObjectId(id) }).toArray();
  const result = await booked
    .aggregate([
      {
        $match: {
          sellerId: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "buyerId",
          foreignField: "_id",
          as: "buyerInfo",
        },
      },
    ])
    .toArray();

  res.send(result);
};
