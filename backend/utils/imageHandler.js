const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = require('../config');

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

exports.uploadImage = (image, email) => {
  return cloudinary.uploader.upload(image, {
    folder: `usersPic/${email}`,
  });
};

exports.deleteImage=(public_id)=>{
  return cloudinary.uploader.destroy(public_id);
}

