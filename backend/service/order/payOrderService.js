const Order = require('../../model/Order');
const Product = require('../../model/Product');
const payOrderService = async ({ details, orderID }) => {
  try {
    const getOrder = await Order.findById(orderID);
    if (!getOrder) {
      throw new Error('No order found!');
    }
    if (getOrder.isPaid) {
      throw new Error('Order already paid!');
    }

    getOrder.isPaid = true;
    getOrder.paidAt = Date.now();
    getOrder.paymentResult.id = details.id;
    getOrder.paymentResult.status = details.status;
    getOrder.paymentResult.updated_time = details.update_time;
    getOrder.paymentResult.email_address = details.payer.email_address;
    const updatedOrder = await getOrder.save();

    // Reduce Product Quantity
    getOrder.orderItems.forEach(async (item) => {
      const pd = await Product.findById(item._id);
      if (+pd.stock < item.quantity) {
        throw new Error(`We have only ${pd.stock} ${item.name} in our stock!`);
      }
      pd.stock = Number(pd.stock) - Number(item.quantity);
      await pd.save();
    });

    return { result: updatedOrder };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = payOrderService;

// router.post('/confirmOrder', async (req, res) => {
//   try {
//     const { orderItems } = req.body;
//     orderItems.forEach(async (item) => {
//       let product = await db.product.findOne({ _id: item.productId });
//       if (product.quantity < item.quantity) {
//         return res
//           .status(400)
//           .json({ message: 'product quantity is not enough' });
//       }
//     });
//     let result = await db.product.updateMany(
//       { _id: { $in: orderItems.map((item) => item.productId) } },
//       { $inc: { quantity: { $multiply: [-1, { $sum: '$quantity' }] } } }
//     );
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
