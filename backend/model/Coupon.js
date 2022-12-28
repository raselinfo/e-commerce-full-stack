const { Schema, model } = require('mongoose');
const couponSchema = new Schema({
  code: { type: String,unique:true, required: true },
  discount: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = model('Coupon', couponSchema, 'coupon');
