const { Schema, model } = require("mongoose");
const tokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
});

const Token = model("Token", tokenSchema,"verify_token");
module.exports = Token;
