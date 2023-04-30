const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `${req.protocol}://${req.get('host')}/uploadImage/images/${req.file.filename}`;
  res.json({ imageUrl });
});

router.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = router;
 