const express = require("express");
const router = express.Router();

const Offer = require("../models/offer");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Application = require("../models/Application");
const User = require("../models/User");

const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");

router.post('/offer/:offerId/apply', requireAuth, checkRole("condidat"), async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.offerId);
        if (!offer) {
            return res.status(404).json({ error: 'Offre introuvable' });
        }

        const userId = req.user._id;
        const existingApplication = await Application.findOne({ user: userId, offer: req.params.offerId });
        if (existingApplication) {
            return res.status(400).json({ error: 'Une candidature existe déjà pour cet utilisateur' });
        }

        // Check if user has already applied to another offer from the same company
        const otherApplications = await Application.find({ user: userId }).populate({
            path: 'offer',
            select: 'company'
        });

        const sameCompanyOffers = otherApplications.filter(app => app.offer.company.equals(offer.company));
        if (sameCompanyOffers.length > 0) {
            return res.status(400).json({ error: 'Vous avez déjà postulé à une offre de cette entreprise' });
        }

        const application = new Application({
            user: userId,
            offer: req.params.offerId,
        });

        await application.save();

        res.json(application);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});



  
router.get('/offers-with-applications', requireAuth, checkRole("company"), async (req, res) => {
    try {
      const companyId = req.user._id;
      const offers = await Offer.find({ company: companyId }).lean();
  
      const offersWithApplications = [];
  
      for (const offer of offers) {
        const applications = await Application.find({ offer: offer._id }).populate('user').lean();
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
  
  


  router.get('/offer/:offerId/applications', requireAuth, checkRole("company"), async (req, res) => {
    try {
      const offerId = req.params.offerId;
      const applications = await Application.find({ offer: offerId }).populate('user', 'email name');
      const users = applications.map(application => {
          const { user, status, statusQuiz, quizScore, interviewScheduled } = application;
          return { 
              user: user,
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



router.put('/offer/:offerId/users/:userId/statusQuiz', requireAuth, checkRole("company"), async (req, res) => {
  try {
    const application = await Application.findOne({ user: req.params.userId, offer: req.params.offerId });
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




  router.put('/offer/:offerId/users/:userId/status', requireAuth,checkRole("company"), async (req, res) => {
    try {
        const application = await Application.findOne({ user: req.params.userId, offer: req.params.offerId });
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




  
  router.get('/offer/:offerId/quizzes', requireAuth, checkRole('company'), async (req, res) => {
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

  router.get('/offer/condidat/:offerId/quizzes', requireAuth, checkRole('condidat'), async (req, res) => {
    try {
        const offerId = req.params.offerId;
        const offer = await Offer.findById(offerId).populate('quizzes');

        if (!offer) {
            return res.status(404).json({ error: 'Offre non trouvée' });
        }

        const application = await Application.findOne({
            offer: offerId,
            user: req.user._id
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


  router.get("/profile", requireAuth, (req, res) => {
    var user = req.user;
    res.status(200).json({ user: user });
  });


  router.get('/notifications', requireAuth,checkRole("condidat") ,async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.json(user.notifications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });


  router.post('/offer/:offerId/quiz/:quizId/submit', requireAuth, checkRole("condidat"), async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.quizId).populate('questions');
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz non trouvé' });
      }
  
      const application = await Application.findOne({ offer: req.params.offerId, user: req.user._id }).populate('user').populate('quizScores.quizId');
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
  





  router.get('/applications/:userId/offers/:offerId/quiz-scores', requireAuth, async (req, res) => {
    try {
      const application = await Application.findOne({ user: req.params.userId, offer: req.params.offerId })
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
  
  




  router.get('/offer/:offerId/quiz/:quizId/score', requireAuth, checkRole("condidat"), async (req, res) => {
    try {
      const application = await Application.findOne({ offer: req.params.offerId, user: req.user._id }).populate('user').populate('quizScores.quizId');
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

  

module.exports = router;
