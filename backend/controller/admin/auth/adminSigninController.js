const adminSignInService = require('../../../service/admin/auth/adminSignInService');
const adminSignInController = async (req, res, next) => {
  try {
    const { result } = await adminSignInService({ credential: req.body });
    res.status(200).json({ message: 'Success', data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = adminSignInController;
