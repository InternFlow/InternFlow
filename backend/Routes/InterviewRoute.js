const express = require("express");
const router = express.Router();

const Offer = require("../models/offer");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Application = require("../models/Application");
const User = require("../models/User");

const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const moment = require('moment');




router.put('/offer/:offerId/user/:userId/application', requireAuth, checkRole("company"), async (req, res) => {
    try {
      const offer = await Offer.findById(req.params.offerId);
      const user = await User.findById(req.params.userId);
  
      if (!offer) {
        return res.status(404).json({ error: 'Offre introuvable' });
      }
  
      const application = await Application.findOne({ user: req.params.userId, offer: req.params.offerId });
  
      if (!application) {
        return res.status(404).json({ error: 'Candidature introuvable' });
      }
  
      // Validate input
      if (!req.body.date || !req.body.time || !req.body.duration) {
        return res.status(400).json({ error: 'Le champ date, time ou duration est manquant' });
      }
  
      // Create a Moment object with the time input
      const time = moment(req.body.time, "HH:mm");
  
      // Check if the time input is valid
      if (!time.isValid()) {
        return res.status(400).json({ error: 'Le champ time est invalide' });
      }
  
      // Create a Moment object with the date input
      const date = moment(req.body.date, "YYYY-MM-DD");
  
      // Combine date and time input
      const datetime = moment({
        year: date.year(),
        month: date.month(),
        date: date.date(),
        hour: time.hour(),
        minute: time.minute()
      });
  
      // Add 1 hour to the datetime
      datetime.add(1, 'hour');
  
      // Check if the datetime input is valid
      if (!datetime.isValid()) {
        return res.status(400).json({ error: 'Le champ date ou time est invalide' });
      }
  
      // Convert the datetime to UTC
      const interviewScheduled = datetime.utc();
  

      const overlappingApplications = await Application.find({
        offer: req.params.offerId,
        'interviewScheduled.date': {
          $gte: moment(interviewScheduled)
            .subtract(req.body.duration, 'minutes')
            .toDate(), // Check if the new interview ends after the start of the existing interview
          $lte: moment(interviewScheduled)
            .add(req.body.duration, 'minutes')
            .toDate(), // Check if the new interview starts before the end of the existing interview
        },
        _id: { $ne: application._id }, // Exclude the current application from the search
      });
      
      if (overlappingApplications.length > 0) {
        const numberOfOverlappingApplications = overlappingApplications.length;
        const errorMessage = `Il y a déjà ${numberOfOverlappingApplications} application${numberOfOverlappingApplications > 1 ? "s" : ""} prévue${numberOfOverlappingApplications > 1 ? "s" : ""} dans cette plage horaire.`;
        return res.status(401).json({ error: errorMessage });
    }

  
      const newInterviewScheduled = {
        date: datetime.toDate(),
        time: req.body.time,
        duration: req.body.duration,
        location: req.body.location
      };
  
      application.interviewScheduled = newInterviewScheduled;
  
      await application.save();
  
      res.status(200).json(application);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
  




  
  router.get('/offer/:offerId/applications/interview-scheduled', requireAuth, checkRole("company"), async (req, res) => {
    try {
      const offer = await Offer.findById(req.params.offerId);
  
      if (!offer) {
        return res.status(404).json({ error: 'Offre introuvable' });
      }
  
      const applications = await Application.find({ offer: req.params.offerId, interviewScheduled: { $ne: null } }).populate('user');
  
      const interviewDates = applications.map(application => application.interviewScheduled);
  
      res.json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
  
  router.get('/applications/interview-scheduled', requireAuth, checkRole("condidat"), async (req, res) => {
    try {
      const applications = await Application.find({ user: req.user._id, interviewScheduled: { $ne: null } }).populate('offer');
      res.json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
  
  

router.post('/notify/:userId/interview/:offerId', requireAuth, checkRole('company'), async (req, res) => {
  const userId = req.params.userId;
  const offerId = req.params.offerId;
  const interviewDate = req.body.interviewDate;

  try {
    const user = await User.findById(userId);
    const offer = await Offer.findById(offerId);
    const newNotification = {
      message: `Vous avez un entretien pour l'offre ${offer.name} le ${interviewDate}`,
      link: '',
      offreid: offerId
    };
    user.notifications.push(newNotification);
    await user.save();
    console.log(`L'utilisateur ${userId} a été notifié d'un entretien pour l'offre ${offerId} le ${interviewDate}`);
    res.status(200).json({ message: `Notification envoyée à l'utilisateur ${userId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur s\'est produite' });
  }
});


module.exports = router;

