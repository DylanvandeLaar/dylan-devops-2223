const { MongoClient } = require("mongodb");

require('dotenv').config();

const uri = process.env.MONGO_URL;
// const client = new MongoClient(uri);
const client = new MongoClient(uri, {

    useNewUrlParser: true,
  
    useUnifiedTopology: true,
  
    family: 4,
  
  });
const db = client.db(process.env.DB_NAME);

module.exports = {
    db: db,
    client: client
};