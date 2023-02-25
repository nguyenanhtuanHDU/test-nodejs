const {
  uploadSingFile,
  uploadMultipleFiles,
  uploadSingFileByMulter,
} = require("../services/fileUpload");

module.exports = {
  postUploadSingleFile: async (req, res) => {
    const img = req.files.img;
    const resUpload = await uploadSingFile(img);
    res.send(resUpload);
  },

  postUploadMultipleFiles: async (req, res) => {
    const imgs = req.files.imgs;
    const resUpload = await uploadMultipleFiles(imgs);
    res.send(resUpload);
  },

  postUploadSingleFileByMulter:  (req, res) => {
    const upload =  uploadSingFileByMulter();

    res.status(200).json({
      EC: 0,
      data,
    });
  },
};
