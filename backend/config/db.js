const mongoose = require("mongoose");
const MONGO_URL=process.env.MONGO_URL;

const mongodb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
  } 
  catch (err) {}
};

module.exports = mongodb;