const express = require("express");
const Offer = require('../Models/Offer');
const openai = require('openai');


const router = express.Router();


//OPENAI KEY
const openaiApiKey = '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'; // Remplacez par votre propre clé API



//Create a new Offer
router.post('/addOffer', async(req,res)=>{
    try {
       const offer = new Offer(req.body); 
       await offer.save();

       res.status(201).json('Offer created successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//Display all Offers
router.get('/getOffers', async(req,res)=>{
    try {
       const offers = await Offer.find();
       res.status(200).json(offers);

    } catch (error) {
        res.status(404).json({ message: err.message });
    }
});

//Get One Offer
router.get('/offers/:id', async(req,res)=>{
    try {
        const offer = await Offer.findById(req.params.id);

        if (offer) {
            res.status(200).json(offer);
        } else {
            res.status(404).json({ message: 'Internship Offer not found' });
        }
 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

//Update an Offer
router.put('/EditOffer/:id', async(req,res)=>{
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id,  req.body, { new: true });

        if (offer) {
            res.status(200).json(offer);
        } else {
            res.status(404).json({ message: 'Internship Offer not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//Delete an Offer
router.delete('/DeleteOffer/:id', async(req,res)=>{
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);

        if (offer) {
          res.status(200).json('Offer deleted successfully');  
        } else {
            res.status(404).json({ message: 'Internship Offer not found' });  
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//------------------ SEARCH Offer  with Openai -------------------------------------//
const searchOffers = async (criteria) => {
    try {
      const result = await openai.completion.create({
        engine: 'davinci',
        prompt: `Search for offers matching the following criteria:\n${criteria.title ? `- Title: ${criteria.title}\n` : ''}${criteria.type_offre ? `- Type of offer: ${criteria.type_offre}\n` : ''}${criteria.duration ? `- Duration: ${criteria.duration}\n` : ''}${criteria.location ? `- Location: ${criteria.location}\n` : ''}`,
        maxTokens: 1024,
        n: 1,
        stop: ['\n'],
      }, { apiKey: openaiApiKey });
  
      return result.choices[0].text.trim();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
// const searchOffers = async (query) => {
//     try {
//       const result = await openai.completion.create({
//         engine: 'davinci',
//         prompt: `Search for offers matching the following criteria:\n${criteria.title ? `- Title: ${criteria.title}\n` : ''}${criteria.type_offre ? `- Type of offer: ${criteria.type_offre}\n` : ''}${criteria.duration ? `- Duration: ${criteria.duration}\n` : ''}${criteria.location ? `- Location: ${criteria.location}\n` : ''}`,
//         // prompt: `Search for offers matching the following criteria: ${query}`,
//         maxTokens: 1024,
//         n: 1,
//         stop: ['\n'],
//       }, { apiKey: openaiApiKey });
  
//       return result.choices[0].text.trim();
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
// };

//OPENAI  =====> NOT WORKING
router.get('/searchOffers', async (req, res) => {
    const { title, type_offre, duration, location } = req.query;
  
    const criteria = {};
    if (title) criteria.title = title;
    if (type_offre) criteria.type_offre = type_offre;
    if (duration) criteria.duration = duration;
    if (location) criteria.location = location;
  
    if (Object.keys(criteria).length === 0) {
      res.status(400).json({ message: 'At least one query parameter is required' });
    } else {
      const offers = await searchOffers(criteria);

      if (!offers) {
        res.status(500).json({ message: 'Failed to retrieve offers' });
      } else {
        res.status(200).json(offers);
      }
    }
});

//OK!
router.get('/search', async (req, res) => {
    const searchText = req.query.query;
  if (!searchText) {
    res.status(400).json({ message: 'Query parameter is required' });
  } else {
    const regex = new RegExp(searchText, 'i');
    try {
      const offers = await Offer.find({
        $or: [
          { title: { $regex: regex } },
          { type_offre: { $regex: regex } },
          { description: { $regex: regex } },
          { duration: { $regex: regex } },
          { location: { $regex: regex } },
          { languages: { $regex: regex } },

        ],
      });
      res.status(200).json(offers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve offers' });
    }
  }
});  


  
  
  


module.exports = router;