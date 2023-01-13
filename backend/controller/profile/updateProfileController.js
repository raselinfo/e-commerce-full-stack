const updateProfileService = require('../../service/profile/updateProfileService');
const updateProfileController = async (req, res, next) => {
  try {
    const { result } = await updateProfileService({
      value: req.body,
      user_id: req.user._id,
    });
    return res.status(200).json({ message: 'OK', data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = updateProfileController;
