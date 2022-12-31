const createOrderService = require('../../service/order/createOrderService');
const JOI = require('joi');
const createOrderController = async (req, res, next) => {
  try {
    const orderSchema = JOI.object({
      orderItems: JOI.array().required(),
      shippingAddress: JOI.object().required(),
      paymentMethod: JOI.string().required(),
      itemPrice: JOI.number().required(),
      shippingPrice: JOI.number().required(),
      taxPrice: JOI.number().required(),
      totalPrice: JOI.number().required(),
      coupon: JOI.object(),
    });
    const { value, error } = orderSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { result } = await createOrderService({ req, value });
    return res
      .status(201)
      .json({ message: 'Order Create Successfully', data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = createOrderController;
