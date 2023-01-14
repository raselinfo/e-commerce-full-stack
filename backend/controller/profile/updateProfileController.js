const updateProfileService = require('../../service/profile/updateProfileService');
const updateProfileController = async (req, res, next) => {
  try {
    const { result } = await updateProfileService({
      value: req.body,
      user_id: req.user._id,
    });
    res.status(200).json({ message: 'Update Successful', data: result });
    // res.send({ message: 'Rasel success' });
  } catch (err) {
    next(err);
  }
};

module.exports = updateProfileController;
