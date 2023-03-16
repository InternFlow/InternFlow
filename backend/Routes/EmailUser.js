const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const bcrypt = require('bcrypt');
const config = require("../config");

const router = express.Router();

// Route pour envoyer un email pour réinitialiser le mot de passe
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found" });
    }

    // Créer un token qui expire après 1 heure
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ tokenfromemail: token })

    // Envoi de l'email avec le lien de réinitialisation de mot de passe
    const transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
        // user: config.SMTP_USERNAME,
        // pass: config.SMTP_PASSWORD
        user: "justfortesthamza@gmail.com",
        pass: "wwowmsfzzttywxvh",
      }
    });
    // Définir les options de message
    const mailOptions = {
      from: config.EMAIL_FROM,
      to: email,
      subject: config.EMAIL_SUBJECT,
      html: `
        <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
        <a href=" http://localhost:3001/new-password/${token}">reset-password </a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Server error" });
      } else {
        console.log("Email sent: " + info.response);
        res.json({ message: "Email sent successfully" });

      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Server error" });
  }

}
);


// Route pour réinitialiser le mot de passe
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(400).json({ errorMessage: "Invalid token" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
});




module.exports = router;
