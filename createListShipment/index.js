const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

module.exports = async function (context, req) {
  const URL = process.env.MONGODB_URL;
  const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;
  const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;

  const connection = await MongoClient.connect(URL);
  const listshipmentCollection = connection
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAME);
  let body = req.body;
  delete body.id;
  const results = await listshipmentCollection.insertOne(body);

  await connection.close();

  return {
    body: '{"message":"Successfully Inserted"}',
    // body: JSON.stringify(results).replace(/_id/g, "id")
  };
};
