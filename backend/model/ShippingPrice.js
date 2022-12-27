const { Schema, model } = require('mongoose');
const shippingPriceSchema = new Schema(
  {
    city: { type: String, unique: true, required: true },
    amount: { type: Number, required: true },
    discountCharge: { type: Number, required: true },
    charge: { type: Number, required: true },
    on: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('ShippingCharge', shippingPriceSchema, 'shippingCharge');
