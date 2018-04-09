const MongoClient = require('mongodb').MongoClient;

const PROD_URI = process.env.DB_URI;

const connect = url => MongoClient.connect(url)
  .then(client => client.db());

module.exports = () => Promise.resolve(connect(PROD_URI))