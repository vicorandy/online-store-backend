const mongoose = require("mongoose");

const connectDB = function (URI) {
  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  // .catch((error) => console.log(error));
};
module.exports = connectDB;
