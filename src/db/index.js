const { MongoServerError } = require("mongodb");
const mongoose = require("mongoose");

const mongodbUrl = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

(async function () {
  try {
    await mongoose.connect(`${mongodbUrl}/${dbName}`);
  } catch (e) {
    if (e instanceof MongoServerError) {
      return console.log(`Server error ${e}`);
    }

    console.log("An error occurred");
  }
})();

module.exports = mongoose;
