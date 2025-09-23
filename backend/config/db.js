const mongoose = require("mongoose");
const MONGO_URL=process.env.MONGO_URL;

const mongodb = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  } 
  catch (err) {console.log("db connection failed")}
};

module.exports = mongodb;

