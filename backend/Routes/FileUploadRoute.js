const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const date = new Date().toISOString().slice(0, 10);
    const randomString = uuidv4().slice(0, 4);
    const folder = path.join(__dirname, '..', 'uploads', date + '_' + randomString);
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Handle file uploads
router.post('/upload', upload.single('file'), (req, res) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/file/uploads/${path.join(req.file.destination.split(path.sep).pop(), req.file.filename).replace(/\\/g, '/')}`;


  res.json({ fileUrl });
});

// Serve static files
router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = router;
