const { Schema, model } = require("mongoose");
const productSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    slug: { type: String, required: [true, "Slug is required"] },
    price: { type: Number, require: [true, "Price is Required"] },
    description: { type: String, required: [true, "Description is required"] },
    image: { type: String, required: [true, "Image is required"] },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, required: [true, "Stock is required"] },
    brand: { type: String, required: [true, "Brand is required"] },
    reviews: { type: [Schema.Types.ObjectId], ref: "Review" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
