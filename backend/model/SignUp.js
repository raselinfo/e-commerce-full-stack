const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name Min Length is 3"],
      maxLength: [15, "Name Max Length is 15"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "Email is required"],
    },
    image: { type: String, required: true },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be 8 Character"],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
