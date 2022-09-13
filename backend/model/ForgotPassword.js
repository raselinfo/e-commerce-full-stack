const { Schema, model } = require("mongoose");
const fPasswordSchema = new Schema({
  email: { type: String, required: true, lowercase: true },
  token: { type: String, required: true },
});

module.exports = model("FPassword", fPasswordSchema);
