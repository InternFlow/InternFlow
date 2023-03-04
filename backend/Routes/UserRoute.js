const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the main page!");
});

router.get("/register", (req, res) => {
  res.send("Welcome to the registration page!");
});

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if(JSON.stringify(password).length<8 ){
      res.status(400).json({ errorMessage: "Password must be at least 8 characters in length." });
    }
    else{
    const user = await User.create({ email, password, role });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 864000 });
    res.json({ token });
  }
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ errorMessage: "Email already in use" });
    } else {
      res.status(500).json({ errorMessage: "Server error" });
    }
  }
});

router.get("/profile", requireAuth, (req, res) => {
  const token = req.cookies.jwt;

  res.send("Profile with token:" + token);
  //res.json({ token });
});

router.get("/login", (req, res) => {
  res.send("Welcome to the login page!");
});

router.post("/login", async (req, res) => {
  const { email, password ,role} = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ errorMessage: "Please provide an email and a password." });
    } else {
      const isPasswordCorrect = await user.isValidPassword(password);
      if (!isPasswordCorrect) {
        res.status(400).json({ errorMessage: "Incorrect e-mail or password." });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 864000 });
        res.json({ token });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "Invalid request." });
  }
});

router.get("/TrainerProfile", requireAuth, checkRole("TRAINER"), (req, res) => {
  // Si l'utilisateur est authentifié et a le rôle de TRAINER,
  // il peut accéder à la route /TrainerProfile
  res.send("Welcome to trainer profile.");
});

router.get("/CompanyProfile", requireAuth, checkRole("COMPANY"), (req, res) => {
  // Si l'utilisateur est authentifié et a le rôle de COMPANY,
  // il peut accéder à la route /CompanyProfile
  res.send("Welcome to company profile.");
});

router.get("/AdminProfile", requireAuth, checkRole("ADMIN"), (req, res) => {
  // Si l'utilisateur est authentifié et a le rôle de ADMIN,
  // il peut accéder à la route /AdminProfile
  res.send("Welcome to admin profile.");
});

router.get("/CandidateProfile", requireAuth, checkRole("CANDIDATE"), (req, res) => {
  // Si l'utilisateur est authentifié et a le rôle de CANDIDATE,
  // il peut accéder à la route /CandidateProfile
  res.send("Welcome to candidate profile.");
});

router.delete("/deactivate-account/:userId", requireAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
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

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = router;
