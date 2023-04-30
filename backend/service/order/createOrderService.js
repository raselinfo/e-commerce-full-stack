const Order = require('../../model/Order');
const createOrderService = async ({ req, value }) => {
  try {
    const filteredValue = {
      orderItems: value.orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress: {
        fullName: value.shippingAddress.name,
        address: value.shippingAddress.address,
        city: value.shippingAddress.city,
        postalCode: value.shippingAddress.postal,
        country: value.shippingAddress.country,
      },
      paymentMethod: value.paymentMethod,
      itemsPrice: value.itemPrice,
      shippingPrice: value.shippingPrice,
      taxPrice: value.taxPrice,
      totalPrice: value.totalPrice,
      coupon: value.coupon,
      user: req.user._id,
    };
    const newOrder = await new Order(filteredValue).save();
    return { result: newOrder };
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = createOrderService;
