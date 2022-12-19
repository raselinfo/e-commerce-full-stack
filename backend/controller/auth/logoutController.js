const logoutService = require('../../service/auth/logoutService');
const logoutController = async (req, res) => {
  try {
    await logoutService({ res });
    res.status(200).json({ message: 'Logout success' });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

module.exports = logoutController;
