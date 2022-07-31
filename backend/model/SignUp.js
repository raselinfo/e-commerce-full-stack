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
      require: [true, "Email is required"],
      match: [
        /^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$/,
        "Please Provide Valid Email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      //should contain at least one digit
      //should contain at least one lower case
      //should contain at least one upper case
      //should contain at least 8 from the mentioned characters
      match: [
        /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/,
        "Passwd Mast be match the mentioned rules",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
