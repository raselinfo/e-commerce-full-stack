const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
    //    orderItems
    },
    {
        timestamps: true
    }
);

const Order = model("Product", orderSchema, 'products')
module.exports = Order