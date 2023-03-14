const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const upload = require("../middlewares/upload");
const uploadCV = require("../middlewares/uploadCV");
const path = require('path');
const router = express.Router();

router.get("/" ,async (req, res) => {
    res.sendFile(path.join(__dirname, 'tests', 'uploadtest.html'));
  });
router.post("/", requireAuth, upload.single('file') ,async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    user.uploadedFiles.push(req.file.path);
    await user.save();
    res.send('File uploaded successfully');
  });

  router.post("/cv", requireAuth, uploadCV.single('file') ,async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    user.uploadedFiles.push(req.file.path);
    await user.save();
    res.send('CV uploaded successfully');
  });


module.exports = router;