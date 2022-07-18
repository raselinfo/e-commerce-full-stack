const { Schema, model } = require("mongoose");
const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  price: { type: Number, require: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  reviews: { type: Schema.Types.ObjectId, ref: "Review" },
});

module.exports = model("Product", productSchema);
