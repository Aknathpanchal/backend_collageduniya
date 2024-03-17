const mongoose = require("mongoose");
const dburl =
  "mongodb+srv://aknath_08:9H4BTiN8yKn3EvHT@cluster0.hfkca9p.mongodb.net/?retryWrites=true&w=majority";
const dbConnection = mongoose
  .connect(dburl)
  .then(() => console.log("successfully connected to Database"))
  .catch((err) => console.log("error", err));

module.exports = dbConnection;
