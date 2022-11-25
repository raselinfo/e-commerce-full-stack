const { Schema, model } = require("mongoose");
const reviewSchema = new Schema({
  rating: { type: Number },
  text: { type: String },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

module.exports = model("Review", reviewSchema);
