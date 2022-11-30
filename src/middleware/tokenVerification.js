const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const header = req.headers["token"];

    if (!header) return res.status(401).send("Unauthorized access !");

    const token = header.split(" ")[1];

    const verify = jwt.verify(token, process.env.JWT_KEY);

    req.decoded = {
      id: verify.id,
      email: verify.email,
    };
    console.log(token);
    console.log(verify.id);
    console.log(verify.email);
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
