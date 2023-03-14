const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const twilio = require('twilio');
const path = require('path');


const config = require('../config');

const router = express.Router();


router.get("/login", async (req, res) =>{
  res.status(200).json({ Message: "bonjour" });

});
//-------------------------- Register -----------------------------------//

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.create({ name, email, password, role });

    await user.hashPassword(user.password);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 864000 });

    res.status(200).json({ successMessage: "User created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ errorMessage: "Email already in use" });
    } else {
      console.log(err);
      res.status(500).json({ errorMessage: "Server error" });
    }
  }
});


//ca

router.get("/admin/dashboard", checkRole("admin"), (req, res) => {
  // If the user is authenticated and has the "admin" role, show the dashboard
  res.status(200).json({ successMessage: "You have access to the admin dashboard" });
}, (err, req, res, next) => {
  // If the user is not authenticated, show an error message
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ errorMessage: "You need to log in to access this page" });
  } else {
    next(err);
  }

});








router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ errorMessage: "L'adresse email ou le mot de passe est incorrect." });
    } else {
      const isPasswordCorrect = await user.isValidPassword(password);
      if (!isPasswordCorrect) {
        res.status(400).json({ errorMessage: "L'adresse email ou le mot de passe est incorrect." });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 864000 });
         res.json({ token,user });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "Requête invalide." });
    res.redirect("/signup");

  }
});



router.delete("/deactivate-account/:userId", requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const verif = await User.findByEmail(req.user.email)
    if (user.role !== "admin" || verif  ) {
      res.status(403).json({ errorMessage: "You do not have the necessary permissions to perform this action." });
    } else {
      const userId = req.params.userId;
      await User.findByIdAndUpdate(userId, { isActive: false });
      res.json({ message: "The account has been successfully deactivated." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "An error occurred while processing your request." });
  }
});

router.put("/updateUser",requireAuth, async (req, res) => {
  try {
    const { name, lastName, password, role } = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, {
      name,
      lastName,
      password,
      role,
    });
const updatedUser= await User.findById(req.user._id);
res.status(200).json(updatedUser);

  }
catch(err){
    console.log(err)
    res.status(500).json({ errorMessage: "An error occurred while processing your request." });
}

});


router.put("/subscribe/:idC",requireAuth, async (req, res) => {
  try {
   const  idC = req.params.idC;
   const  intern = req.user;
  intern.companies.push(idC);
  await intern.save();
 //  const user = await User.findByIdAndUpdate(idI,push(),{new:true});
   console.log(intern);
   res.status(200).json("subscribe ok");
  } catch (error) {
   res.status(500).json(error.message);
  }
 });




router.put("/confirmCompanyandTrainer/:id", async (req, res) => {
  try {
   const {id} = req.params;
   const user = await User.findByIdAndUpdate(id,{confirmed:true},{new:true});
   console.log(user);
  } catch (error) {
   res.status(500).json(error.message);
  }
 });




 router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
});

module.exports = router;
