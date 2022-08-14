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
    image: { type: Object, required: true },
    local: {
      password: String,
    },
    google: {
      googl_id: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
