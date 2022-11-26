const { ObjectID } = require("bson");
const { getDb } = require("../database/db");

exports.verifyAdmin = async (req, res, next) => {
  try {
    const { id, email } = req.decoded;
    const users = await getDb().collection("user");
    const check = await users.findOne({ _id: ObjectID(id) });
    if (check.role !== "admin")
      return res.status(401).send("Unauthorized access !");
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
