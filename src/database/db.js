const { MongoClient } = require("mongodb");

let client;
let db;

const connectToDatabase = async () => {
  client = new MongoClient(process.env.DB_URI);
  await client.connect();
  db = client.db("nextPhoneDb");
};

module.exports = { connectToDatabase, client, db };
