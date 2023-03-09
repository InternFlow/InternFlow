const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.user._id; 
      const userFolderPath = path.join(__dirname, 'uploads', userId.toString());
      fs.mkdirSync(userFolderPath, { recursive: true }); // create user directory if it doesn't exist
      cb(null, userFolderPath);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const ext = path.extname(originalName);
        const baseName = path.basename(originalName, ext);
        const userId = req.user._id;
        const userFolderPath = path.join(__dirname, 'uploads', userId.toString());
        let filePath = path.join(userFolderPath, originalName);
        let index = 1;
        while (fs.existsSync(filePath)) {
          const newName = `${baseName}-${index}${ext}`;
          filePath = path.join(userFolderPath, newName);
          index++;
        }
        cb(null, path.basename(filePath));
      },
      
  });
  const upload = multer({ storage });
  module.exports= upload;
  