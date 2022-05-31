const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        // Products
        orderItems: [
            {
                slug: { type: String, required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                }
            }
        ],
        // Address
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        // Payment
        paymentMethod: { type: String, required: true },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        // Prices
        itemPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        // User
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        // Track The Order
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date }
    },
    {
        timestamps: true
    }
);

const Order = model("Order", orderSchema, 'orders')
module.exports = Order