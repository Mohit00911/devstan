const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
  cloud_name: 'dmyzudtut', 
  api_key: '874837483274837', 
  api_secret: 'a676b67565c6767a6767d6767f676fe1'
});
 const imageUpload=async (req, res) => {
    try {
      console.log(req.body)
      // const file = req.files.file; 
      
      // const result = await cloudinary.uploader.upload(file.tempFilePath);
      // res.json({ imageUrl: result.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  }

module.exports = {
    imageUpload
  };
  