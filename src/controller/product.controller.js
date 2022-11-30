const { ObjectId } = require("mongodb");
const { getDb } = require("../database/db");
const { timeStamp } = require("../utils/timestamp");

exports.addProduct = async (req, res) => {
  const products = await getDb().collection("product");
  const { category, userID, ...rest } = req.body;

  const result = await products.insertOne({
    ...rest,
    userID: ObjectId(userID),
    category: ObjectId(category),
    status: "available",
    createdAt: timeStamp(),
  });
  res.send(result);
};

exports.products = async (req, res) => {
  const products = await getDb().collection("product");
  if (req.query.email) {
    const result = await products.find({ email: req.query.email }).toArray();
    return res.send(result);
  }
  const result = await products.find({}).toArray();
  res.send(result);
};

exports.getProducts = async (req, res) => {
  const products = await getDb().collection("product");
  const result = await products
    .aggregate([
      {
        $match: {
          status: "available",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "user",
          localField: "userID",
          foreignField: "_id",
          as: "sellerInfo",
        },
      },
    ])
    .toArray();

  res.send(result);
};

exports.advertisement = async (req, res) => {
  const products = await getDb().collection("product");
  const result = await products
    .aggregate([
      {
        $match: {
          _id: ObjectId(req.params.id),
        },
      },

      {
        $lookup: {
          from: "user",
          localField: "userID",
          foreignField: "_id",
          as: "sellerInfo",
        },
      },
    ])
    .toArray();

  res.send(...result);
};

exports.getProductsByLocation = async (req, res) => {
  const products = await getDb().collection("product");
  const result = await products
    .aggregate([
      {
        $match: {
          location: req.params.location,
          status: "available",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "user",
          localField: "userID",
          foreignField: "_id",
          as: "sellerInfo",
        },
      },
    ])
    .toArray();

  res.send(result);
};

exports.advertize = async (req, res) => {
  const products = await getDb().collection("product");
  const result = await products
    .aggregate([
      {
        $match: {
          status: "available",
          advertize: true,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "user",
          localField: "userID",
          foreignField: "_id",
          as: "sellerInfo",
        },
      },
    ])
    .toArray();

  res.send(result);
};

exports.getProductsByCat = async (req, res) => {
  const products = await getDb().collection("product");
  console.log(req.params.id);
  const result = await products
    .aggregate([
      {
        $match: { category: ObjectId(req.params.id), status: "available" },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "user",
          localField: "userID",
          foreignField: "_id",
          as: "sellerInfo",
        },
      },
    ])
    .toArray();

  res.send(result);
};

exports.deleteProduct = async (req, res) => {
  const products = await getDb().collection("product");
  const result = await products.deleteOne({ _id: ObjectId(req.params.id) });
  res.send(result);
};

exports.advertizeProduct = async (req, res) => {
  const User = await getDb().collection("product");
  const result = await User.updateOne(
    { _id: ObjectId(req.params.id) },
    {
      $set: { advertize: true },
    }
  );
  res.send(result);
};
