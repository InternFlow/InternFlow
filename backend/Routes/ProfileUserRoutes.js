const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const twilio = require('twilio');
const path = require('path');


const config = require('../config');

const router = express.Router();


router.get("/", async (req, res) =>{
  res.status(200).json({ Message: "bonjour" });

});
//-------------------------- edit profile condidat -----------------------------------//
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
  router.patch('/editprofile/:id', getUser, async (req, res) => {
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
    if (req.body.educations != null) {
      res.user.educations = req.body.educations;
    }
    if (req.body.experiences != null) {
      res.user.experiences = req.body.experiences;
    }
    if (req.body.skills != null) {
      res.user.skills = req.body.skills;
    }
    try {
      const updatedUser = await res.user.save();
      await updatedUser.hashPassword(updatedUser.password);
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



router.get('/getUser/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Récupération du user par son id
    const candidate = await User.findById(id);

    // Vérification de la présence du candidat
    if (!candidate) {
      return res.status(404).json({ message: 'Le candidat est introuvable.' });
    }
    // Vérification que seul le candidat peut mettre à jour son propre profil
    if (candidate.role !== 'condidat' ) {
      return res.status(401).json({ message: 'Vous n\'êtes pas condidat.' });
    }

    // Envoi de la réponse
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des informations du user.' });
  }
});




module.exports = router;
