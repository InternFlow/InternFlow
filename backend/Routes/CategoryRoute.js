const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");

const Category = require("../models/Category");
const mongoose = require("mongoose");
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


router.get('/allCategories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting categories');
  }
});

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


  router.post('/registerCategory', async (req, res) => {

    try {
      const category = new Category({
        name: req.body.name
      
      });  
      await category.save();
  
  
      res.send(category);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });



  module.exports = router;
