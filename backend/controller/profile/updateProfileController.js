const updateProfileService = require('../../service/profile/updateProfileService');
const updateProfileController = async (req, res, next) => {
  try {
    const { result } = await updateProfileService({
      value: req.body,
      user_id: req.user._id,
    });
    res.status(204).json({ message: 'Update Successful', data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = updateProfileController;
