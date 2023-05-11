const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const twilio = require('twilio');
const path = require('path');
const natural = require('natural');



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
  router.patch('/editprofile/:id', requireAuth, getUser, async (req, res) => {
    res.user = await User.findById(req.params.id);
    if (req.body.name != null) {
      res.user.name = req.body.name;
    }
    if (req.body.lastName != null) {
      res.user.lastName = req.body.lastName;
    }
    if (req.body.email != null) {
      res.user.email = req.body.email;
    }
    if (req.body.occupation != null) {
      res.user.occupation = req.body.occupation;
    }
    if (req.body.role != null) {
      res.user.role = req.body.role;
    }
    if (req.body.local != null) {
      res.user.local = req.body.local;
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
    if (req.body.description != null && req.body.description != '') {
      res.user.description = req.body.description;
    }
    if (req.body.local != null) {
      res.user.local = req.body.local;
    }
    try {

      const updatedUser = await re.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.patch('/editmyprofile', requireAuth, async (req, res) => {
    res.user = req.user;
    if (req.body.name != null) {
      res.user.name = req.body.name;
    }
    if (req.body.lastName != null) {
      res.user.lastName = req.body.lastName;
    }
    if (req.body.email != null) {
      res.user.email = req.body.email;
    }
    if (req.body.occupation != null) {
      res.user.occupation = req.body.occupation;
    }
    if (req.body.role != null) {
      res.user.role = req.body.role;
    }
    if (req.body.local != null) {
      res.user.local = req.body.local;
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
    if (req.body.description != null && req.body.description != '') {
      res.user.description = req.body.description;
    }
    if (req.body.local != null) {
      res.user.local = req.body.local;
    }
    try {
      
       await res.user.save();
      res.status(200).json("user updated successfully");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


  router.patch('/editmyprofilepicture', requireAuth, async (req, res) => {
    res.user = req.user;
    if (req.body.pfpPath != null) {
      res.user.pfpPath = req.body.pfpPath;
    }
    try {
      
       await res.user.save();
      res.status(200).json("Pfp updated successfully");
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
    if (candidate.role !== 'condidat' || candidate._id !== req.user._id ) {
      return res.status(401).json({ message: 'Vous n\'êtes pas condidat.' });
    }

    // Envoi de la réponse
    candidate.password="";
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des informations du user.' });
  }
});







module.exports = router;
