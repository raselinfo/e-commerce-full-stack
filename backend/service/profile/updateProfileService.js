const User = require('../../model/User');
const Password = require('../Password/Password');
const { uploadImage, deleteImage } = require('../../utils/imageHandler');

// Documentation
// updateProfileService update user information
// if user upload image then it's delete previous image first then then save the new image link in the database
// if user update his/her password the it's save the hashed password in the local object of the database
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

    // Upload New Image

    if (value.image && value.image.trim().substring(0, 4) !== 'http') {
      let imageResult = await uploadImage(value.image, findUser.email);
      // Deleted previous image
      if (imageResult.url && findUser?.image?.public_id) {
        await deleteImage(findUser.image.public_id);
      }
      // Save new image in the database
      findUser.image = {
        url: imageResult.url,
        public_id: imageResult.public_id,
      };
    }

    // If password changed
    if (value.password && value.password === value.confirm_password) {
      findUser.local.password = await Password.hash(value.password);
    }
    // Save all the updated data in the database
    const updatedUser = await findUser.save();

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
