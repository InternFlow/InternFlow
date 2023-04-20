const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const Resume = require("../models/Resume");
const { checkRole } = require("../middlewares/checkRole");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
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

//ahmed

router.get("/profile", requireAuth, (req, res) => {
  var user = req.user;
  res.status(200).json({ user: user });
});


//ahmed

router.get('/offers-with-applications', requireAuth, checkRole("company"), async (req, res) => {
  try {
    const companyId = req.user._id;
    const offers = await Offer.find({ company: companyId }).lean();

    const offersWithApplications = [];

    for (const offer of offers) {
      const applications = await Candidacy.find({ offer: offer._id }).populate('intern').lean();
      if (applications.length > 0) {
        offer.applications = applications;
        offersWithApplications.push(offer);
      }
    }

    res.status(200).json({ offers: offersWithApplications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



//ahmed

router.put('/offer/:offerId/users/:userId/status', requireAuth,checkRole("company"), async (req, res) => {
  try {
      const application = await Candidacy.findOne({ intern: req.params.userId, offer: req.params.offerId });
      if (!application) {
          return res.status(404).json({ error: 'Candidature introuvable pour cet utilisateur et cette offre' });
      }

      if (application.status !== "pending") {
          return res.status(400).json({ error: 'Le statut de cette candidature a déjà été modifié' });
      }

      // Vérification si un quiz est vide
      const offer = await Offer.findById(req.params.offerId).populate('quizzes');
      for (const quiz of offer.quizzes) {
          if (quiz.questions.length === 0) {
              return res.status(400).json({ error: `Le quiz ${quiz.name} est vide. Veuillez le remplir pour pouvoir valider son statut et envoyer tous les quiz.` });
          }
      }

      // Si tous les quiz sont remplis, on peut modifier le statut
      application.status = req.body.status;
      if (application.status === "pending") {
          return res.status(400).json({ error: 'Donnez un autre état' });
      }

      await application.save();

      if (application.status === "approved") {
          const user = await User.findById(req.params.userId);
          const offer = await Offer.findOne({ _id: req.params.offerId });
          user.notifications.push({
              message: "Vous avez été approuvé pour l'offre " + offer.name + ". Veuillez passer le quiz dès que possible.",
              link: `/offers/${req.params.offerId}/quiz`,
              offreid:req.params.offerId
          });
          await user.save();
      }

      res.status(200).json({message: 'vous avez fait la premiere validation les quizs ont ete envoyer au candidat '});
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
  }
});



//ahmed


router.get('/offer/:offerId/quizzes', requireAuth, checkRole('company'), async (req, res) => {
  try {
    const offerId = req.params.offerId;
    console.log("idididi");
    console.log(offerId);
    const offer = await Offer.findById(offerId).populate('quizzes');
console.log(offer.quizzes);
    if (!offer) {
      return res.status(404).json({ error: 'Offre non trouvée' });
    }
    res.json(offer.quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


//ahmed


router.get('/offer/condidat/:offerId/quizzes', requireAuth, checkRole('condidat'), async (req, res) => {
  try {
      const offerId = req.params.offerId;
      console.log("idididi");
    console.log(offerId);
      const offer = await Offer.findById(offerId).populate('quizzes');

console.log(offer.quizzes);
      if (!offer) {
          return res.status(404).json({ error: 'Offre non trouvée' });
      }

      const application = await Candidacy.findOne({
          offer: offerId,
          intern: req.user._id
      });

      const quizzes = offer.quizzes;

      const userQuizzes = application.quizScores;
  
      const userQuizzesIds = quizzes ? quizzes.map(quiz => quiz._id.toString()) : [];
      const offreQuizzesIds = userQuizzes ? userQuizzes.map(quiz => quiz.quizId.toString()) : [];
      
      const sortedUserQuizzesIds = userQuizzesIds.sort();
      const sortedOffreQuizzesIds = offreQuizzesIds.sort();
      
      const hasCompletedAllQuizzes = sortedUserQuizzesIds.length === sortedOffreQuizzesIds.length &&
        sortedUserQuizzesIds.every((quizId, index) => quizId === sortedOffreQuizzesIds[index]);
      

  
      if (hasCompletedAllQuizzes) {
        return res.status(400).json({ message: 'Vous avez déjà passé tout les quizs' });
      }

      res.status(200).json(offer.quizzes);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
  }
});








//ahmed





router.get('/offer/:offerId/quizzes', requireAuth, checkRole('condidat'), async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const offer = await Offer.findById(offerId).populate('quizzes');

    if (!offer) {
      return res.status(404).json({ error: 'Offre non trouvée' });
    }
    res.json(offer.quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});






//ahmed


router.post('/offer/:offerId/quiz/:quizId/submit', requireAuth, checkRole("condidat"), async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz non trouvé' });
    }

    const application = await Candidacy.findOne({ offer: req.params.offerId, intern: req.user._id }).populate('intern').populate('quizScores.quizId');
    console.log('Application trouvée:', application);

    if (!application) {
      return res.status(404).json({ error: 'Aucune candidature approuvée trouvée pour cette offre pour cet utilisateur' });
    }

    const quizId = req.params.quizId;
    const existingQuizScore = application.quizScores.find((score) => score.quizId._id.toString() === quizId);

    if (existingQuizScore) {
      return res.status(400).json({ error: `Le quiz a déjà été soumis pour cette candidature` });
    }

    const userAnswers = req.body.answers;
   

    let score = 0;
    const quizResults = [];

    for (let j = 0; j < quiz.questions.length; j++) {
      const question = quiz.questions[j];
      const userAnswer = userAnswers[j];

      if (!userAnswer) {
        // Si la réponse de l'utilisateur est manquante, le score pour cette question est 0
        quizResults.push({ name: question.name, score: 0 });
        continue;
      }

      // Compare la réponse de l'utilisateur à la liste des choix de la question
      const correctChoiceIndex = question.choices.findIndex(choice => choice === question.correctChoice);
      const userChoiceIndex = question.choices.findIndex(choice => choice === userAnswer);

      // Vérifie si l'index de la réponse de l'utilisateur correspond à l'index de la réponse correcte
      if (userChoiceIndex === correctChoiceIndex) {
        score += question.score;
        quizResults.push({ name: question.name, score: question.score });
      } else {
        quizResults.push({ name: question.name, score: 0 });
      }
    }

    const quizScore = { quizId: quiz._id, name: quiz.name, score };
    application.quizScores.push(quizScore);
    application.quizResults = quizResults;
    await application.save();
    const result = { user: req.user._id, score };
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});







//ahmed
router.get('/notifications', requireAuth,checkRole("condidat") ,async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});





//ahmed
router.put('/offer/:offerId/users/:userId/statusQuiz', requireAuth, checkRole("company"), async (req, res) => {
  try {
    const application = await Candidacy.findOne({ intern: req.params.userId, offer: req.params.offerId });
    if (!application) {
      return res.status(404).json({ error: 'Candidature introuvable pour cet utilisateur et cette offre' });
    }
    
    if (application.status !== "approved") {
      return res.status(400).json({ error: 'Vous n\'avez pas validé le CV de ce candidat' });
    }
    
    if (application.statusQuiz !== "pending") {
      return res.status(400).json({ error: 'Le statut du quiz de cette candidature a déjà été modifié' });
    }
    
    const offer = await Offer.findById(req.params.offerId).populate('quizzes');
    if (!offer) {
      return res.status(404).json({ error: 'Offre introuvable' });
    }
    
    const quizzes = offer.quizzes;

    const userQuizzes = application.quizScores;

    const userQuizzesIds = quizzes ? quizzes.map(quiz => quiz._id.toString()) : [];
    const offreQuizzesIds = userQuizzes ? userQuizzes.map(quiz => quiz.quizId.toString()) : [];
    
    const sortedUserQuizzesIds = userQuizzesIds.sort();
    const sortedOffreQuizzesIds = offreQuizzesIds.sort();
    
    const hasCompletedAllQuizzes = sortedUserQuizzesIds.length === sortedOffreQuizzesIds.length &&
      sortedUserQuizzesIds.every((quizId, index) => quizId === sortedOffreQuizzesIds[index]);
    
    

    if (!hasCompletedAllQuizzes) {
      return res.status(400).json({ error: 'Ce candidat n\'a pas complété tous les quizzes pour cette offre' });
    }


    
    application.statusQuiz = req.body.statusQuiz;
    await application.save();
    
    if (application.statusQuiz === "approved") {
      const user = await User.findById(req.params.userId);
      const offer = await Offer.findOne({ _id: req.params.offerId });
      const newNotification = {
        message: "Vous avez été temporairement accepté pour l'offre " + offer.name + ". Vous resevez les detailles de l'entretien dans les 48 heures.",
        link: ``,
        offreid: req.params.offerId
      };
      user.notifications.push(newNotification);
      await user.save();
    }
    res.status(200).json({message:'vous avez validez les quizs du candidat vous devez un entretien dans 48h '});


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});



//ahmed




router.get('/offer/:offerId/applications', requireAuth, checkRole("company"), async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const applications = await Candidacy.find({ offer: offerId }).populate('intern');
    const users = applications.map(application => {
        const { intern, status, statusQuiz, quizScore, interviewScheduled } = application;
        return { 
            intern: intern,
            status: status,
            statusQuiz: statusQuiz,
            quizScore: quizScore,
            interviewScheduled: interviewScheduled
        }
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



router.get('/applications/:userId/offers/:offerId/quiz-scores', requireAuth, async (req, res) => {
  try {
    const application = await Candidacy.findOne({ intern: req.params.userId, offer: req.params.offerId })
      .populate('quizScores.quizId', 'name')

    if (!application) {
      return res.status(404).json({ error: 'Candidature introuvable pour cet utilisateur et cette offre' });
    }

    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
















// ahmed


router.get('/offer/:offerId/quiz/:quizId/score', requireAuth, checkRole("condidat"), async (req, res) => {
  try {
    const application = await Candidacy.findOne({ offer: req.params.offerId, intern: req.user._id }).populate('intern').populate('quizScores.quizId');
    console.log('Application trouvée:', application);

    if (!application) {
      return res.status(404).json({ error: 'Aucune candidature approuvée trouvée pour cette offre pour cet utilisateur' });
    }

    const quizId = req.params.quizId;
    const quizScore = application.quizScores.find((score) => score.quizId._id.toString() === quizId);

    if (!quizScore) {
      return res.status(404).json({ error: `Le quiz n'a pas été soumis pour cette candidature` });
    }

    res.json({ score: quizScore.score });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});







//ahmed

  

router.get('/offers/my-offers', requireAuth, checkRole('company'), async (req, res) => {
  try {
    const user = req.user;

    // Chercher tous les offres d'emploi créées par l'utilisateur
    const offers = await Offer.find({ company: user._id }).populate('company');
    res.json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


//ahmed
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
    const candidacy = await Candidacy.create({ dateApply:date,lettre,offer:offer,intern:intern,resume:resume._id,status:"pending",resumeType:"spec"}); 
    console.log(candidacy);

}else {
      const resume = await Resume.create({ description:description ,experiences:experiences,
        skills:skills,educations:educations,filePath:req.file.filename})
        const candidacy = await Candidacy.create({ dateApply:date,lettre,offer:offer,intern:intern,resume:resume._id,status:"pending",resumeType:"spec"}); 
        console.log(candidacy);

      }





        const user2 = await User.updateOne({ _id: intern,role:"condidat" },  { $push: { OfferIdI: offer } });

        const user = await User.updateOne({ _id: intern, role:"company"}, { $push: { OfferIdC: offer } });

      } else {
        console.log("general");
    const candidacy = await Candidacy.create({dateApply:date, lettre,offer:offer,intern:intern,status:"pending",resumeType:"gen"}); 
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
