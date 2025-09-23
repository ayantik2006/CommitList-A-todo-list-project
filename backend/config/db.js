const mongoose = require("mongoose");
const MONGO_URL=process.env.MONGO_URL;

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  } 
  catch (err) {}
};

module.exports = mongodb;

