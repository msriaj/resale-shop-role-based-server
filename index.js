const express = require("express");
const cors = require("cors");
const router = require("./src/routes/router");
const { connectToDatabase } = require("./src/database/db");
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51M8qENL39Ynj9W9LNxVcZjHul6AJOu3wpBvwONekzwqtpDGhS0UJRu9Eq2Lo27CidYSxMK4PPA1JMGM0TCDFIrq900C24wHGHp"
);

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// db connect and use router
connectToDatabase()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.use("/api", router);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => console.log(err));
