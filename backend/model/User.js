const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const User = model("User", userSchema, 'users')
module.exports = User