const { Schema, model } = require("mongoose");
const reviewSchema = new Schema({
  rating: { type: Number },
  text: { type: String },
});

module.exports = model("Review", reviewSchema);
