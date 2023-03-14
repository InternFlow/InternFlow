const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const config = require("../config");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

const router = express.Router();
const otps = {}; // stockage des codes OTP

// Fonction pour valider le code OTP
function validateOtp(email, otp) {
return otps[email] === otp;
}

function hashPassword(password) {
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync(password, salt);
return hashedPassword;
}

// Route pour envoyer un email pour réinitialiser le mot de passe
router.post("/forgot-password", async (req, res) => {
console.log(req.body);

const { email } = req.body;
const otp = otpGenerator.generate(6, {
digits: true,
alphabets: false,
upperCase: false,
specialChars: false,
});

try {
console.log(email);
const user = await User.findOne({ email });
if (!user) {
return res.status(400).json({ errorMessage: "User not found" });
}// Envoi de l'email avec le lien de réinitialisation de mot de passe
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  auth: {
    user: config.SMTP_USERNAME,
    pass: config.SMTP_PASSWORD,
  },
});

// Définir les options de message
const mailOptions = {
  from: config.EMAIL_FROM,
  to: email,
  subject: config.EMAIL_SUBJECT,
  text: `Votre code de réinitialisation du mot de passe est ${otp}`,
};

// Envoyer l'email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Server error" });
  } else {
    console.log("Email sent: " + info.response);
    // Stocker le code OTP associé à l'email dans le tableau otps
    otps[email] = otp;
    res.json({ message: "Email sent successfully" });
  }
});
} catch (err) {
  console.error(err);
  res.status(500).json({ errorMessage: "Server error" });
  }
  });

  // Route pour réinitialiser le mot de passe
  router.post("/reset-password", async (req, res) => {
  try {
  const { email, otp, password } = req.body;
  if (!validateOtp(email, otp)) {
  return res.status(400).json({ errorMessage: "Code OTP invalide" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ errorMessage: "Email introuvable" });
  }
  const hashedPassword = hashPassword(password); // Fonction de hachage pour sécuriser le mot de passe

  user.password = hashedPassword;
  await user.save();

  return res
    .status(200)
    .send({ message: "Mot de passe réinitialisé avec succès" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Server error" });
    }
    });

    module.exports = router;
