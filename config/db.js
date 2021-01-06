const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Database connected."))
    .catch((err) => console.log(err.message));
};

module.exports = connectDB;
