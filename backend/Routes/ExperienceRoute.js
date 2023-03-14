const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");

const Education = require("../models/Education");
const Experience = require("../models/Experience");
const router = express.Router();
/*
router.post("/registerEducation/:id", async (req, res) => {
    const {id} = req.params;
    const { university, speciality, start, end} = req.body;
    try {

    
      const education = await Education.create({ university , speciality, start, end});
      const user = await User.findByIdAndUpdate(id,{isActive:false},{new:true});

    } catch (err) {
    
        res.status(500).json({ errorMessage: "Server error" });
      
    }
  });
*/


router.delete('/delete/:id', requireAuth,async (req, res) => {
  try {
    const {id} = req.params;

    // Find and delete the experience with the specified _id
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) {
      return res.status(404).send({ error: 'Experience not found' });
    }

    res.send(experience);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


  router.post('/register/:id',requireAuth, async (req, res) => {

    try {
        const {id} = req.params;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      const experience = new Experience({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        user: user._id
      });  
      await experience.save();

      user.experiences.push(experience._id);
      await user.save();
  
      res.send(experience);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });


  //CRUD Experience 
  //Add Exerience
  router.post('/addE', async (req, res) => {
    try {
      const exp = new Experience(req.body);
      await exp.save();
  
      res.json(exp);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error creating Exp');
    }
  });
  
  //Get Exp
  // Route pour récupérer tous les Exp
  router.get('/allE', async (req, res) => {
    try {
      const exp = await Experience.find();
      res.json(exp);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error getting exp');
    }
  });

  async function getExp(req, res, next) {
    let exp;
    try {
      exp = await Experience.findById(req.params.id);
      if (exp == null) {
        return res.status(404).json({ message: 'Experience non trouvé' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.exp = exp;
    next();
  }

  router.put('/updateE/:id', getExp, async (req, res) => {
    if (req.body.name != null) {
      res.exp.name = req.body.name;
    }
   
    try {
      const updatedExp = await res.exp.save();
      res.json(updatedExp);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

   // Route pour supprimer un utilisateur
   router.delete('/deleteE/:Id', async (req, res) => {
    try {
      const exp = await Experience.findByIdAndDelete(req.params.Id);
      if (!exp) {
        res.status(404).send('Experience not found');
      } else {
        res.json(exp);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Error deleting Experience');
    }
  });
  
  


  module.exports = router;
