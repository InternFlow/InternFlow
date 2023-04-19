const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const Resume = require("../models/Resume");

const Candidacy = require("../models/Candidacy");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const Offer = require("../models/Offer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.get('/showApplyOffer', async (req, res) => {
  const idC = req.query.idC; 
  console.log("idC");
console.log(idC);

  try {

    const apply = await Candidacy.findById(idC);
    console.log(apply);

   // const comp = await User.findOne({ OfferIdC: { $in: idO } });
    //const comp2 = await User.findById('64389921c49256540309366b');

    

    console.log("comapnyyy");

//console.log(comp);

console.log("comapnyyy");

    res.json(apply);
    console.log(res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting apply');
  }
});

router.get('/getListCandidacyInter/:id', async (req, res) => {
  try {

    const candidacies = await
     Candidacy.find({ 'intern': req.params.id }).populate('offer');
    res.json(candidacies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/getListCandidaciesOffer/:id', async (req, res) => {
  try {

    const candidacies = await
     Candidacy.find({ 'offer': req.params.id }).populate('offer');
    res.json(candidacies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get('/showResume', async (req, res) => {
  const id = req.query.id;
  console.log("yalla");
 console.log(id);
  try {

    const candidacy = await Candidacy.findById(id);
console.log(candidacy);
if(candidacy.resumeType==="spec"){

    const apply = await Resume.findById(candidacy.resume);

    res.json(apply);
}
else {

  const comp = await User.findById(candidacy.intern);

  console.log(comp);
  res.json(comp);

}
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting apply');
  }
});



router.get('/showCompany', async (req, res) => {
  const idO = req.query.idO;
 
console.log(idO);
  try {
    console.log(idO);

    const comp = await User.findOne({ OfferIdC: { $in: idO } });


    console.log(idO);
    

    console.log("comapnyyy");

console.log(comp);

console.log("comapnyyy");

    res.json(comp);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting apply');
  }
});


router.get('/showApply', async (req, res) => {
  const id = req.query.id;
  const idO = req.query.idO;
 
console.log(id);
console.log(idO);

  try {

    const apply = await Candidacy.findOne({ intern: id, offer:idO });
    const comp = await User.findOne({ OfferIdC: { $in: idO } });

    const comp2 = await User.findById('64389921c49256540309366b');

    

    console.log("comapnyyy");

console.log(comp);

console.log("comapnyyy");

    res.json(apply);
    console.log(res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting apply');
  }
});

router.get('/verif', async (req, res) => {
  const { id } = req.params;

  try {
    // Récupération du user par son id
    const candidate = await User.findById(id);

    // Vérification de la présence du candidat
    if (!candidate) {
      return res.status(404).json({ message: 'Le candidat est introuvable.' });
    }
    // Vérification que seul le candidat peut mettre à jour son propre profil
    if (candidate.role !== 'condidat' || candidate._id !== req.user._id ) {
      return res.status(401).json({ message: 'Vous n\'êtes pas condidat.' });
    }

    // Envoi de la réponse
    candidate.password="";
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des informations du user.' });
  }
});


router.get('/verifA', async (req, res) => {
  const idOffer = req.query.id;
  const idIntern = req.query.idO;
  const apply = await Candidacy.findOne({ intern: idIntern, offer:idOffer });

  if (apply !== null) {
    console.log("Le document existe.");
const success=true;
res.json({ success });

  } else {
    console.log("Le document n'existe pas.");
    const success = false;
    res.json({ success });

  }
  // Votre logique pour traiter l'ID ici
});



router.get('/resume', (req, res) => {
  const fileName = req.query.fileName;
  const filePath = path.join(__dirname, '..','uploads', fileName);
console.log(filePath);
  res.download(filePath, error => {
    if (error) {
      console.error('Error while downloading file:', error);
      res.status(500).send('Error while downloading file');
    }
  });
});

router.delete('/delete', async (req, res) => {
  try {
    const { idA } = req.query;
    console.log(idA);
    const deletedCandidacy = await Candidacy.findByIdAndDelete(idA);
    const resume = await Resume.findByIdAndDelete( deletedCandidacy.resume);
    const user = await User.findByIdAndUpdate(deletedCandidacy.intern, { $pull: { OfferIdI: deletedCandidacy.offer } }, { new: true });

    if (!deletedCandidacy) {
      return res.status(404).json({ message: 'Candidacy not found' });
    }
    res.json({ message: 'Candidacy deleted', data: deletedCandidacy });
  } catch (error) {
    console.error('Error while deleting Candidacy:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






router.post('/apply',  upload.single('file'), async (req, res) => {
console.log("step 1 apply");
  try {
    const experiences = JSON.parse(req.body.selectedExperience);
    const skills = JSON.parse(req.body.selectedSkills);
    const educations = JSON.parse(req.body.selectedEducation);
    const { lettre, offer, intern, description ,oui} = req.body;
const date=new Date();
      if(oui==="spec"){
console.log(req.file==null);
if (req.file==null){

  const resume = await Resume.create({ description:description ,experiences:experiences,
    skills:skills,educations:educations})
    const candidacy = await Candidacy.create({ dateApply:date,lettre,offer:offer,intern:intern,resume:resume._id,status:"On hold",resumeType:"spec"}); 
    console.log(candidacy);

}else {
      const resume = await Resume.create({ description:description ,experiences:experiences,
        skills:skills,educations:educations,filePath:req.file.filename})
        const candidacy = await Candidacy.create({ dateApply:date,lettre,offer:offer,intern:intern,resume:resume._id,status:"On hold",resumeType:"spec"}); 
        console.log(candidacy);

      }





        const user2 = await User.updateOne({ _id: intern,role:"condidat" },  { $push: { OfferIdI: offer } });

        const user = await User.updateOne({ _id: intern, role:"company"}, { $push: { OfferIdC: offer } });

      } else {
        console.log("general");
    const candidacy = await Candidacy.create({dateApply:date, lettre,offer:offer,intern:intern,status:"On hold",resumeType:"gen"}); 
console.log(candidacy);
const user2 = await User.updateOne({ _id: intern,role:"condidat" }, { OfferIdI: offer });

const user = await User.updateOne({ _id: intern, role:"company"}, { OfferIdC: offer });

  }
/*
    const skills = new Skills({
      name: req.body.name,
              
    });  
    await skills.save();

    user.skills.push(skills._id);
    await user.save();

    res.send(skills); */

    res.status(200).json({ successMessage: "candidacy created successfully" });

  } 

  catch (err) {
    console.error(err);
    res.status(500).send('Server erffror');
  }
});






  module.exports = router;
