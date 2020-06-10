const mongoose = require("mongoose");

const databaseInit = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  mongoose.connection
    .on("error", () => console.error("cannot connect to database"))
    .once("open", () => console.log("connected to database"));
};

module.exports = databaseInit;
