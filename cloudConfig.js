const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,  // ✅ Fixed typo
    api_secret: process.env.CLOUD_API_SECRET
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({  // ✅ Use "new"
    cloudinary: cloudinary,
    params: {
        folder: "wanderlust_DEV",  // ✅ "folder" instead of "format"
        allowedFormats: ["png", "jpg", "jpeg"]
    }
});

module.exports = {
    cloudinary,
    storage
};
