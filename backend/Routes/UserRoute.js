const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const twilio = require("twilio");
const path = require("path");
const multer = require('multer');

const config = require("../config");
const Offer = require("../Models/Offer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

//-------------------------------- Moodifier Offre de Company ----------------------------------------------//
// Route pour modifier une offre d'une société
router.put('/Modifiercompanies/:companyId/offers/:offerId', async (req, res) => {
  try {
    const { companyId, offerId } = req.params;

    // Récupérer l'offre à modifier
    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).send('Offre non trouvée');
    }

    // Vérifier que l'offre appartient à la société spécifiée
    if (offer.company.toString() !== companyId.toString()) {
      return res.status(403).send('Accès refusé');
    }

    // Mettre à jour les propriétés de l'offre
    offer.title = req.body.title;
    offer.type_offre = req.body.type_offre;
    offer.description = req.body.description;
    offer.availability = req.body.availability;
    offer.startDate = req.body.startDate;
    offer.endDate = req.body.endDate;
    offer.duration = req.body.duration;
    offer.location = req.body.location;
    offer.nb_places_available = req.body.nb_places_available;
    offer.languages = req.body.languages;
    offer.skills = req.body.skills;

    // Sauvegarder les modifications dans la base de données
    const savedOffer = await offer.save();

    res.status(200).json(savedOffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Fonction pour retirer une offre d'une société
async function removeOfferFromCompany(companyId, offerId) {
  // Récupérer la société avec l'identifiant donné
  const company = await User.findById(companyId.trim());

  // Retirer l'identifiant de l'offre de la liste des offres de la société
  company.offers.pull(offerId);

  // Sauvegarder les modifications dans la base de données
  await company.save();
}



// Route pour supprimer une offre d'une société
router.delete('/Deletecompanies/:companyId/offers/:offerId', async (req, res) => {
  try {
    const { companyId, offerId } = req.params;

    // Vérifier si la société existe
    const company = await User.findById(companyId);
    if (!company) {
      return res.status(404).send('Société non trouvée');
    }

    // Vérifier si l'offre existe dans la liste des offres de la société
    if (!company.offers.includes(offerId)) {
      return res.status(404).send('Offre non trouvée');
    }

    // Retirer l'offre de la liste des offres de la société
    await removeOfferFromCompany(companyId, offerId);

    res.status(200).send('Offre retirée avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});









//----------------------------- Cloudinary --------------------------------------------------------------//
// configuration de cloudinary
cloudinary.config({
  cloud_name: 'djjimxala',
  api_key: '835443316573354',
  api_secret: '-kCoGza7xNvaAIHDDjGUvr3GRDA'
});

// configuration de multer et du stockage de Cloudinary
const storageC = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Offer',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif']
  }
});

const uploadC = multer({ storage: storageC });


//------------------------- Consulter Offre de Company -----------------------------------------------//
router.get('/Affichercompanies/:companyId/offers', async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const offers = await Offer.find({ company: companyId });
    res.status(200).send(offers);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching offers for company');
  }
});

//----------------------- Assign Offers to Company2 -------------------------------------------------//
// Fonction pour associer une offre à une société
async function assignOfferToCompany(companyId, offerId) {
  // Récupérer la société avec l'identifiant donné
  const company = await User.findById(companyId.trim());

  // Ajouter l'identifiant de la nouvelle offre à la liste des offres de la société
  company.OfferIdC.push(offerId);

  // Sauvegarder les modifications dans la base de données
  await company.save();
}

// Route pour ajouter une offre à une société
router.post('/Ajoutercompanies/:id/offers' ,async (req, res) => {
  try {
  console.log('aaaaaaa');
    // const { companyId } = req.params;
    const companyId = req.params.id;

    console.log(companyId);

    // Créer une nouvelle offre à partir des données envoyées dans la requête
    const newOffer = new Offer({
      title: req.body.title,
      type_offre: req.body.type_offre,
      description: req.body.description,
      availability: req.body.availability,
      startDate: req.body.startDate,
      endDate: req.body.endDate,

      duration: req.body.duration,
      location: req.body.location,
      nb_places_available: req.body.nb_places_available,
      languages: req.body.languages,
      skills: req.body.skills,
      // image: req.file,


      company: companyId
    });

    // Sauvegarder la nouvelle offre dans la base de données
    const savedOffer = await newOffer.save();

    // Appeler la fonction pour associer l'offre à la société
    await assignOfferToCompany(companyId, savedOffer._id);

    res.status(201).json(savedOffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});



router.get("/login", async (req, res) => {
  res.status(200).json({ Message: "bonjour" });
});
//-------------------------- Register -----------------------------------//

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  let errors = {};
  if (!name) {
    errors.name = "donner le nom";
  } else {
    // Vérifier que le nom contient au moins 8 caractères sans les chiffres
    if (!/^[a-zA-Z]{8,}$/.test(name)) {
      errors.name = "Name should contain at least 8 characters without numbers";
    }
  }

  if (!password) {
    errors.password = "donner le password";
  } else {
    // Vérifier que le mot de passe contient au moins 8 caractères et au moins un chiffre et une lettre
    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      errors.password =
        "Password should contain at least 8 characters with at least one letter and one number";
    }
  }

  if (!email) {
    errors.email = "donner un email";
  } else {
    // Vérifier que l'adresse email est valide
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

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
      res.status(400).json({ errors: { email: "Email already in use" } });
      // errors.email = "Email already in use"
    } else {
      console.log(err);
      res.status(500).json({ errors: { server: "Server error" } });
    }
  }
});

//ca

router.get(
  "/admin/dashboard",
  requireAuth,
  checkRole("admin"),
  (req, res) => {
    // If the user is authenticated and has the "admin" role, show the dashboard
    res
      .status(200)
      .json({ successMessage: "You have access to the admin dashboard" });
  },
  (err, req, res, next) => {
    // If the user is not authenticated, show an error message
    if (err.name === "UnauthorizedError") {
      res
        .status(401)
        .json({ errorMessage: "You need to log in to access this page" });
    } else {
      next(err);
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let errors = {};

  if (!password) {
    errors.password = "donner le password";
  } else {
    // Vérifier que le mot de passe contient au moins 8 caractères et au moins un chiffre et une lettre
    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      errors.password =
        "Password should contain at least 8 characters with at least one letter and one number";
    }
  }

  if (!email) {
    errors.email = "donner un email";
  } else {
    // Vérifier que l'adresse email est valide
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ errors: { email: "email incorrecte" } });
    } else {
      const isPasswordCorrect = await user.isValidPassword(password);
      if (!isPasswordCorrect) {
        res.status(400).json({ errors: { password: "password incorrecte" } });
      } else {
        if (user.confirmed == false) {
          if (user.confirmExpiration < Date.now()) {
            res
              .status(400)
              .json({
                errors: { expiration: "vous aves passé la date limite " },
              });
          } else {
            res
              .status(400)
              .json({ errors: { expiration: "confimé votre compte " } });
          }
        } else {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.cookie("jwt", token, { httpOnly: true, maxAge: 864000 });

          res.json({ token, user });
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "Requête invalide." });
    // res.redirect("/signup");
  }
});

router.delete(
  "/deactivate-account/:userId",
  requireAuth,
  checkRole("admin"),
  async (req, res) => {
    try {
      const user = req.user;
      const verif = await User.findByEmail(req.user.email);
      if (user.role !== "admin" || verif) {
        res
          .status(403)
          .json({
            errorMessage:
              "You do not have the necessary permissions to perform this action.",
          });
      } else {
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, { isActive: false });
        res.json({ message: "The account has been successfully deactivated." });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          errorMessage: "An error occurred while processing your request.",
        });
    }
  }
);

router.put("/updateUser", requireAuth, async (req, res) => {
  try {
    const { name, lastName, role } = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, {
      name,
      lastName,
      role,
    });
    const updatedUser = await User.findById(req.user._id);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        errorMessage: "An error occurred while processing your request.",
      });
  }
});

router.put("/subscribe/:idC", requireAuth, async (req, res) => {
  try {
    const idC = req.params.idC;
    const intern = req.user;
    intern.companies.push(idC);
    await intern.save();
    //  const user = await User.findByIdAndUpdate(idI,push(),{new:true});
    console.log(intern);
    res.status(200).json("subscribe ok");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/confirm/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { confirmed: true },
      { new: true }
    );
    console.log(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/profile", requireAuth, (req, res) => {
  var user = req.user;
  res.status(200).json({ user: user });
});

router.get("/company", requireAuth, (req, res) => {
  var user = req.user;
  res.status(200).json({ user: user });
});

router.get("/logout", async (req, res) => {
  // Supprime le cookie jwt
  res.clearCookie("jwt");
  // Supprime le cookie de session connect.sid
  res.clearCookie("connect.sid");

  // Redirige vers la page de connexion
  return res.status(200).redirect('/login');

});

module.exports = router;
