const { Schema, model } = require('mongoose');
const storeUtilsSchema = new Schema(
  {
    tax: { type: Number, unique: true, required: true },
    storeName: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('StoreUtils', storeUtilsSchema, 'storeUtils');
