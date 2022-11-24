const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const router = require("./src/routes/router");
const { connectToDatabase } = require("./src/database/db");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// db connect
connectToDatabase().then(() => {
  const port = process.env.PORT || 8000;
  app.use("/api", router);
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
});
