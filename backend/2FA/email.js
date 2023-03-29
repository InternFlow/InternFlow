const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: 'zeineb.haraketi@esprit.tn',
    pass: 'E181JFT1062'
  }
});

module.exports = transporter;
