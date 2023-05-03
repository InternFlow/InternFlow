const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const jwt = require("jsonwebtoken");

const Training = require("../models/Training");
const mongoose = require("mongoose");
const Notification = require("../Models/Notification");
const router = express.Router();


router.get('/notifications', async(req,res)=>{
  const id = req.query.id;
console.log("id");
console.log(id);
       const notifications = await Notification.find({userR:id});
       console.log(notifications);
       res.status(200).json(notifications);


});






  module.exports = router;
