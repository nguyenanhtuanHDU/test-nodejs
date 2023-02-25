const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  postUploadSingleFile,
  postUploadMultipleFiles,
  postUploadSingleFileByMulter,
} = require('../controllers/apiController');
const Customer = require('../models/Customer');
const { uploadSingFile } = require('../services/fileUpload');
const { postCreateService, getAllServices } = require("../controllers/serviceController");

router.get('/user', async (req, res) => {
  const listusers = await User.find();
  res.status(200).json({
    EC: 'success',
    data: listusers,
  });
});

router.post('/user', async (req, res) => {
  const { name, email, city } = req.body;

  await User.create({ name, email, city });

  res.status(200).json({
    EC: req.body,
  });
});

router.put('/user', async (req, res) => {
  const { id, name, email, city } = req.body;

  await User.updateOne({ _id: id }, { name, email, city });

  res.status(200).json({
    EC: req.body,
  });
});

router.delete('/user', async (req, res) => {
  const { id } = req.body;

  const deleted = await User.deleteOne({ _id: id });

  res.status(200).json({
    EC: req.body,
    userDelete: deleted,
  });
});

router.post('/file', postUploadSingleFile);
router.post('/files', postUploadMultipleFiles);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/image/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
      '-' +
      uniqueSuffix +
      '.' +
      path.extname(file.originalname)
    );
  },
});

router.post('/customer', async (req, res) => {
  const { name, email } = req.body;

  const customer = await Customer.create({
    name,
    email,
  });

  res.status(200).json({
    EC: 0,
    data: customer,
  });
});

router.post('test-upload', (req, res) => {
  res.send('upload ok');
});

router.get('/service', getAllServices)
router.post('/service', postCreateService)

module.exports = router;
