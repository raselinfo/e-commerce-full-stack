const User = require('../../model/User');
const Password = require('../Password/Password');
const uploadImage = require('../../utils/imageHandler');
const updateProfileService = async ({ value, user_id }) => {
  try {
    if (!value) {
      throw new Error('No data found!');
    }
    if (!user_id) {
      throw new Error('Unauthorized');
    }
    let findUser = await User.findById(user_id);
    if (!findUser) {
      throw new Error('Unauthorized');
    }
    findUser.name = value.name || findUser.name;
    findUser.email = value.email || findUser.email;
    let imageResult;
    if (value.image) {
      imageResult = await uploadImage(value.image, 'New Image');
    }
    findUser.image.url = imageResult.url;
    findUser.image.public_id = imageResult.public_id;
    console.log(imageResult.public_id);
    if (value.password && value.password === value.confirm_password) {
      findUser.local.password = await Password.hash(value.password);
    }
    const updatedUser = await findUser.save();
    console.log('✅✅', updatedUser);
    return {
      result: {
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image.url,
        role: updatedUser.role,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = updateProfileService;
