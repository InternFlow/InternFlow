const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");

const Skills = require("../models/Skills");
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


router.delete('/delete/:id',requireAuth, async (req, res) => {
  try {
    const {id} = req.params;

    // Find and delete the skills with the specified _id
    const skills = await Skills.findByIdAndDelete(id);
    if (!skills) {
      return res.status(404).send({ error: 'Skills not found' });
    }

    res.send(skills);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


  router.post('/registerSkills/:id',requireAuth, async (req, res) => {

    try {
        const {id} = req.params;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      const skills = new Skills({
        name: req.body.name,
                
      });  
      await skills.save();
  
      user.skills.push(skills._id);
      await user.save();
  
      res.send(skills);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  //Add Skills
  router.post('/addS', async (req, res) => {
    try {
      const skill = new Skills(req.body);
      await skill.save();
  
      res.json(skill);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error creating skill');
    }
  });
  
  //Get Users
  // Route pour récupérer tous les utilisateurs
  router.get('/allS', async (req, res) => {
    try {
      const skills = await Skills.find();
      res.json(skills);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error getting skills');
    }
  });

  async function getSkill(req, res, next) {
    let skill;
    try {
      skill = await Skills.findById(req.params.id);
      if (skill == null) {
        return res.status(404).json({ message: 'Skill non trouvé' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.skill = skill;
    next();
  }


  router.put('/updateS/:id', getSkill, async (req, res) => {
    if (req.body.name != null) {
      res.skill.name = req.body.name;
    }
   
    try {
      const updatedSkill = await res.skill.save();
      res.json(updatedSkill);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  
  
  
  // Route pour supprimer un utilisateur
  router.delete('/deleteS/:Id', async (req, res) => {
    try {
      const skill = await Skills.findByIdAndDelete(req.params.Id);
      if (!skill) {
        res.status(404).send('Skill not found');
      } else {
        res.json(skill);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Error deleting Skill');
    }
  });
  


  module.exports = router;
