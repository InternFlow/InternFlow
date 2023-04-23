const express = require("express");
const router = express.Router();

const Offer = require("../models/offer");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const Application = require("../models/Application");




// Ajouter une offre
router.post(
  "/ajoutoffre",
  requireAuth,
  checkRole("company"),
  async (req, res) => {
    try {
      const { name, category } = req.body;
      const company = req.user._id;

      const newOffer = new Offer({ name, company, category });

      await newOffer.save();

      res.status(201).json(newOffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);






router.get("/offers", requireAuth, (req, res) => {
  var user = req.offer;
  res.status(200).json({ user: user });
});







router.delete(
  "/deleteofferandquizandquestion/:id",
  requireAuth,
  checkRole("company"),
  async (req, res) => {
    const { id } = req.params;

    try {
      // Trouver l'offre et récupérer les IDs des quiz associés
      const offer = await Offer.findById(id);
      if (!offer) {
        return res.status(404).json({ message: "Offre inconnue" });
      }
      const quizIds = offer?.quizzes ?? [];

      // Supprimer les quizs et leurs questions associées
      let deletedQuizzes = [];
      let questionIds = [];
      if (quizIds.length > 0) {
        deletedQuizzes = await Quiz.deleteMany({ _id: { $in: quizIds } });
        if (Array.isArray(deletedQuizzes) && deletedQuizzes.length > 0) {
          questionIds = deletedQuizzes.flatMap((q) => q?.questions ?? []);
        }
      }

      // Supprimer les questions associées aux quizs
      if (questionIds.length > 0) {
        await Question.deleteMany({ _id: { $in: questionIds } });
      }

      // Supprimer l'offre
      const deletedOffer = await Offer.findByIdAndDelete(id);

      res.json({
        message: "Offre supprimée avec succès.",
        deletedOffer,
        deletedQuizzes,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Une erreur est survenue lors de la suppression de l'offre.",
        });
    }
  }
);






router.post(
  "/addquiztooffer/:offerId",
  requireAuth,
  checkRole("company"),
  async (req, res) => {
    try {
      const offerId = req.params.offerId;

      const offer = await Offer.findById(offerId);
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }

      const application = await Application.findOne({
        offer: offer._id,
        status: "approved",
        statusQuiz: "pending"
      });

      if (application) {
        return res.status(400).json({ error: "il y a des candidats qui passent le test,vous ne pouvez pas ajouter un quiz pour cette offre maintenant  " });

      }

      const { name, coefficient, timeout } = req.body;

      const newQuiz = new Quiz({
        name,
        coefficient,
        timeout,
        company: req.user._id,
      });

      await newQuiz.save();

      offer.quizzes.push(newQuiz);

      await offer.save();

      res.status(201).json({ message: "Quiz added successfully", quiz: newQuiz });
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add quiz to offer" });
    }
  }
);

  




router.put(
  "/offer/:offerId/editquiz/:quizId",
  requireAuth,
  checkRole("company"),
  async (req, res) => {
    try {
      const offerId = req.params.offerId;
      const quizId = req.params.quizId;

      const offer = await Offer.findById(offerId);
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }

      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      const { name, coefficient, timeout } = req.body;

      quiz.name = name;
      quiz.coefficient = coefficient;
      quiz.timeout = timeout;

      await quiz.save();

      res.status(200).json({ message: "Quiz updated successfully", quiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);






router.delete(
  "/offer/:offerId/deletequiz/:quizId",
  requireAuth,
  checkRole("company"),
  async (req, res) => {
    try {
      const offerId = req.params.offerId;
      const quizId = req.params.quizId;

      const offer = await Offer.findById(offerId);
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }

      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      // Find all questions associated with the quiz
      const questions = await Question.find({ quiz: quizId });

      if (questions.length > 0) {
        // If the quiz has questions associated with it, delete all the questions
        await Question.deleteMany({ quiz: quizId });
      }

      // Remove the quiz from the offer's quizzes array
      offer.quizzes.pull(quiz);

      // Remove the quiz from the database
      await Quiz.findByIdAndDelete(quizId);

      // Save the changes to the offer
      await offer.save();

      res
        .status(200)
        .json({
          message: "Quiz and associated questions deleted successfully",
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);





router.post('/offer/:offerId/quiz/:quizId/addquestion', requireAuth, checkRole("company"), async (req, res) => {
    try {
      const offerId = req.params.offerId;
      const quizId = req.params.quizId;
  
      const offer = await Offer.findById(offerId).populate('quizzes');
      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
  
      const quiz = offer.quizzes.find(q => q._id.toString() === quizId);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  

      const application = await Application.findOne({
        offer: offer._id,
        status: "approved",
        statusQuiz: "pending"
      });

      if (application) {
        return res.status(400).json({ message: "il y a des candidats qui passent le test,vous ne pouvez pas ajouter une question pour cette quiz maintenant  " });

      }

      const { text, choices, correctChoice, score } = req.body;
  
      const newQuestion = new Question({ quiz: quizId, text, choices, correctChoice, score });
    
      await newQuestion.save();
    
      quiz.questions.push(newQuestion);
    quiz.scoremax=quiz.scoremax + newQuestion.score;
      await quiz.save();
    
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  

  

  

  router.delete('/offer/:offerId/deletequestion/:questionId', requireAuth, checkRole("company"), async (req, res) => {
    try {
      const offerId = req.params.offerId;
      const questionId = req.params.questionId;
  
      const offer = await Offer.findById(offerId);
      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
  
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      const quiz = await Quiz.findById(question.quiz);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      quiz.scoremax=quiz.scoremax - question.score;

      // Remove the question from the quiz's questions array
      quiz.questions.pull(question);

      // Remove the question from the database
      await Question.findByIdAndDelete(questionId);
  
      // Save the changes to the quiz
      await quiz.save();
  
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  router.get('/offer/:offerId/quizzes/:quizId',requireAuth, checkRole("company"), async (req, res) => {
    try {
      const offer = await Offer.findOne({ _id: req.params.offerId });
      if (!offer) {
        return res.status(404).json({ error: 'Offre introuvable' });
      }
  
      const quiz = await Quiz.findOne({ _id: req.params.quizId, company: offer.company }).populate('questions');
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz introuvable' });
      }
  
      res.json(quiz);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
  





  router.get('/offer/condidat/:offerId/quizzes/:quizId',requireAuth, checkRole("condidat"), async (req, res) => {
    try {
      const offer = await Offer.findOne({ _id: req.params.offerId });
      if (!offer) {
        return res.status(404).json({ error: 'Offre introuvable' });
      }
  
      const quiz = await Quiz.findOne({ _id: req.params.quizId, company: offer.company }).populate('questions');
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz introuvable' });
      }
  
      res.json(quiz);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });



  
  router.get('/offer/:offerId/quizzes/:quizId/questions',requireAuth, checkRole("company"), async (req, res) => {
    try {
      const offer = await Offer.findOne({ _id: req.params.offerId });
      if (!offer) {
        return res.status(404).json({ error: 'Offre introuvable' });
      }
  
      const quiz = await Quiz.findOne({ _id: req.params.quizId, company: offer.company }).populate('questions');
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz introuvable' });
      }
  
      res.json(quiz);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
  




  
  router.get('/offer/condidat/:offerId/quizzes/:quizId/questions',requireAuth, checkRole("condidat"), async (req, res) => {
    try {
      const offer = await Offer.findOne({ _id: req.params.offerId });
      if (!offer) {
        return res.status(404).json({ error: 'Offre introuvable' });
      }
  
      const quiz = await Quiz.findOne({ _id: req.params.quizId, company: offer.company }).populate('questions');
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz introuvable' });
      }
  
      res.json(quiz.questions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });


  router.get('/offer/condidat/:offerId/quizzes/:quizId/questions',requireAuth, checkRole("condidat"), async (req, res) => {
    try {
      const offer = await Offer.findOne({ _id: req.params.offerId });
      if (!offer) {
        return res.status(404).json({ error: 'Offre introuvable' });
      }
  
      const quiz = await Quiz.findOne({ _id: req.params.quizId, company: offer.company }).populate({
        path: 'questions',
        select: '-correctChoice' // exclure la propriété correctChoice
      });
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz introuvable' });
      }
  
      res.json(quiz.questions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
  



router.get('/offerbyid/:offerId', async (req, res) => {
    try {
      const offer = await Offer.findById(req.params.offerId);
      if (!offer) {
        return res.status(404).json({ error: 'Offre introuvable' });
      }
      res.json(offer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

module.exports = router;
