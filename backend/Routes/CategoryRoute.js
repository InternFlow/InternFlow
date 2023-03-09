const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");

const Category = require("../models/Category");
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



router.delete('/delete/:id',requireAuth , async (req, res) => {
  try {
    const {id} = req.params;

    // Find and delete the category with the specified _id
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send({ error: 'Category not found' });
    }

    res.send(category);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


  router.post('/registerCategory',requireAuth , async (req, res) => {

    try {
      const category = new Category({
        name: req.body.name,
        users:     [{ type: mongoose.Types.ObjectId, ref: 'User' }],

      
      });  
      await category.save();
  
  
      res.send(category);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });



  module.exports = router;
