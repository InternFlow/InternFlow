const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const config = require("../config");

const Category = require("../models/Category");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Candidacy = require("../models/Candidacy");

router.post('/addU', async (req, res) => {
  try {
    const user = new User(req.body);
    user.confirmed = false; // ajouter cette ligne pour initialiser "isconfirmed" à false
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user.confirmationToken = token;
    user.confirmExpiration = Date.now() + 48 * 60 * 60 * 1000
    await user.save();
    await user.hashPassword(user.password);

    const transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const confirmationLink = `http://localhost:5000/admin/confirm/${token}`;


    const html = `
    <p>Bienvenue sur notre site. Veuillez cliquer sur le lien ci-dessous pour confirmer votre compte :</p>
    <h2> votre mots de passe est : ${req.body.password}</h2>
    <a href="${confirmationLink}"> ******** bien sure ******</a>
  `;


    // Définir les options de message
    const mailOptions = {
      from: config.EMAIL_FROM,
      to: user.email,
      subject: config.EMAIL_SUBJECT,
      text: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Server error" });
      } else {
        console.log("Email sent: " + info.response);
        // Stocker le code OTP associé à l'email dans le tableau otps
        res.json({ message: "Email sent successfully" });
      }
    });


    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating user');
  }
});








router.get('/confirm/:token', async (req, res) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Token de confirmation invalide ou expiré' });
    }

    if (user.confirmed) {
      return res.status(400).json({ message: 'Ce compte a déjà été confirmé' });
    }

    if (user.confirmExpiration < Date.now()) {
      return res.status(400).json({ message: 'Le token de confirmation a expiré' });
    }

    user.confirmed = true;
    user.confirmationToken = undefined;
    user.confirmExpiration = undefined;
    await user.save();
    res.redirect('http://localhost:3000/');

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});









//Get Users
// Route pour récupérer tous les utilisateurs
router.get('/allU', requireAuth, checkRole("admin"), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting users');
  }
});


router.get('/allCandidacies', requireAuth, checkRole("admin"), async (req, res) => {
  try {
    console.log("aaaaaaaaaaaaaaa");

    const candidacies = await Candidacy.find()
    .populate('intern')
    .populate('offer');
    console.log(candidacies);
    res.json(candidacies);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting users');
  }
});



async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

//router.patch('/users/:id',checkRole("admin"), getUser, async (req, res) => {

router.patch('/editU/:id', requireAuth, checkRole("admin"), getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.role != null) {
    res.user.role = req.body.role;
  }

  try {
    const updatedUser = await res.user.save();
    await updatedUser.hashPassword(updatedUser.password);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




// Route pour supprimer un utilisateur
router.delete('/deleteU/:userId', requireAuth, checkRole("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting user');
  }
});


module.exports = router;
