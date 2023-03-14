const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");

const Category = require("../models/Category");
const mongoose = require("mongoose");
const router = express.Router();
router.post('/addU', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    await user.hashPassword(user.password);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating user');
  }
});

//Get Users
// Route pour récupérer tous les utilisateurs
router.get('/allU', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
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

router.put('/users/:id', getUser, async (req, res) => {
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
router.delete('/deleteU/:userId', async (req, res) => {
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
