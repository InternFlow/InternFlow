const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const router = express.Router();
const path = require('path');

router.get("/UserList",requireAuth, checkRole("ADMIN"), async (req, res) => {
    try{
        const users = await User.find();
          res.send(users); 
    } 
    catch(err){
        console.log(err)
        res.status(500).json({ errorMessage: "An error occurred while processing your request." });

    }

  });

router.delete("/DeleteUser/:userId",requireAuth, checkRole("ADMIN"), async (req, res) => {
  try{
    const user = await User.findById(req.params.userId);
    if (user){
      await User.deleteOne({_id: user._id});
      res.send("User deleted."); 
    }
} 
catch(err){
    console.log(err)
    res.status(500).json({ errorMessage: "An error occurred while processing your request." });
}
});

router.post("/CreateUser",requireAuth, checkRole("ADMIN"), async (req, res) => {
  try{
      const user = req.newUser;
       const newUser= await User.save(user);
        res.send(200).json(newUser);
  } 
  catch(err){
      console.log(err)
      res.status(500).json({ errorMessage: "An error occurred while processing your request." });
  }
});



router.put("/UpdateUser",requireAuth, checkRole("ADMIN"), async (req, res) => {
  try{
      const user = req.UpdatedUser;
        await User.updateOne(user);
        res.send(200).json(user);
  } 
  catch(err){
      console.log(err)
      res.status(500).json({ errorMessage: "An error occurred while processing your request." });
  }
});

router.put("/AddUserList",requireAuth, checkRole("ADMIN"), async (req, res) => {
  try{
    const user = req.newUser;
    const newUserList =await User.bulkSave(user);
        res.send(200).json(newUserList)
  } 
  catch(err){
      console.log(err)
      res.status(500).json({ errorMessage: "An error occurred while processing your request." });
  }
});



  module.exports = router;