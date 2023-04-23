const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.user._id; 
      const userFolderPath = path.join(__dirname, 'uploads', userId.toString(),'cv');
      fs.mkdirSync(userFolderPath, { recursive: true }); // create user directory if it doesn't exist
      cb(null, userFolderPath);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const ext = path.extname(originalName);
        const userId = req.user._id;
        const userFolderPath = path.join(__dirname, 'uploads', userId.toString());
        const cvFolderPath = path.join(__dirname, 'uploads', userId.toString(), 'CV');
        const filePath = path.join(cvFolderPath, 'CV' + ext);
      
        // create the user folder if it doesn't exist
        if (!fs.existsSync(userFolderPath)) {
          fs.mkdirSync(userFolderPath);
        }
      
        // create the CV folder if it doesn't exist
        if (!fs.existsSync(cvFolderPath)) {
          fs.mkdirSync(cvFolderPath);
        }
      
        // check if a file with the same name exists
        if (fs.existsSync(filePath)) {
            const basename = path.basename(filePath, ext);
            let index = 1;
            while (fs.existsSync(path.join(cvFolderPath, `old${basename}${index}${ext}`))) {
              index++;
            }
            fs.renameSync(filePath, path.join(cvFolderPath, `old${basename}${index}${ext}`));
          }
      
        // rename the uploaded file to "CV"
        cb(null, 'CV' + ext);
      }
      ,
      
  });
  const uploadCV = multer({ storage });
  module.exports= uploadCV;
  