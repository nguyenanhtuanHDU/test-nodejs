const path = require("path");
const multer  = require('multer')

module.exports = {
  uploadSingFile: async (file) => {
    try {
      const timeStamp = new Date().getTime();
      const extName = path.extname(file.name);
      const baseName = path.basename(file.name, extName);

      let finalName = `${baseName}-${timeStamp}${extName}`;

      uploadPath = path.join("./src", "/public/image/upload/") + finalName;

      await file.mv(uploadPath);
      return {
        status: "success",
        fileName: finalName,
        error: null,
      };
    } catch (error) {
      return {
        status: "error",
        fileName: null,
        error: error,
      };
    }
  },
  uploadSingFileByMulter: () =>{
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/image/upload/')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
    })
    
    const upload = multer({ storage: storage })
    return upload
  },
  uploadMultipleFiles: async (files) => {
    try {
      let countSuccess = 0;
      let dataUploads = [];
      await files.map((file) => {
        let data = {};
        const timeStamp = new Date().getTime();
        const extName = path.extname(file.name);
        const baseName = path.basename(file.name, extName);

        let finalName = `${baseName}-${timeStamp}${extName}`;
        uploadPath = path.join("./src", "/public/image/upload/") + finalName;
        file.mv(uploadPath);

        data = {
          status: "success",
          fileName: file.name,
          pathName: finalName,
          error: null,
        };
        dataUploads.push(data);
        countSuccess++;
      });
      return {
        EC: 0,
        data: {
          countSuccess,
          detail: dataUploads,
        },
      };
    } catch (error) {
      return {
        status: "error",
        fileName: null,
        error: error,
      };
    }
  },
};
