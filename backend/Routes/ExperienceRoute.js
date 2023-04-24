const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");

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



  module.exports = router;
