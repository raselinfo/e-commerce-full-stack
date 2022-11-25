const { Schema, model } = require("mongoose");
const categorySchema = new Schema({
  name: { type: String, required: [true,"Name is required"] },
});

module.exports = model("Category", categorySchema);
