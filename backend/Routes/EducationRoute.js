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

router.delete('/delete/:id', requireAuth , async (req, res) => {
  try {
    const {id} = req.params;

    // Find and delete the education with the specified _id
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      return res.status(404).send({ error: 'education not found' });
    }

    res.send(education);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


  router.post('/addEducation/:id',requireAuth , async (req, res) => {

    try {
        const {id} = req.params;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      const education = new Education({
        university: req.body.university,
        speciality: req.body.speciality,
        start: req.body.start,
        end: req.body.end,
        user: user._id
      });  
      await education.save();
      user.educations.push(education._id);
      await user.save();
  
      res.send(education);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });



  module.exports = router;
