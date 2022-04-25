const mongoose = require("mongoose");
// database schema
const MovieSchema = new mongoose.Schema({
  Name: String,
  Release_date: Number,
});

module.exports = mongoose.model("Movie", MovieSchema);
