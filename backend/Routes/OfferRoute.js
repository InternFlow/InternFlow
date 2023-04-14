const express = require("express");
const Offer = require('../Models/Offer');
const { requireAuth } = require("../middlewares/requireAuth");
const User = require("../models/User");
const multer = require('multer');

// const User = require('../Models/User');

// const openai = require('openai');


const router = express.Router();


//OPENAI KEY
// const openaiApiKey = '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'; // Remplacez par votre propre clé API



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
router.get('/displayOffer/:id', async(req,res)=>{
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
// const searchOffers = async (criteria) => {
//     try {
//       const result = await openai.completion.create({
//         engine: 'davinci',
//         prompt: `Search for offers matching the following criteria:\n${criteria.title ? `- Title: ${criteria.title}\n` : ''}${criteria.type_offre ? `- Type of offer: ${criteria.type_offre}\n` : ''}${criteria.duration ? `- Duration: ${criteria.duration}\n` : ''}${criteria.location ? `- Location: ${criteria.location}\n` : ''}`,
//         maxTokens: 1024,
//         n: 1,
//         stop: ['\n'],
//       }, { apiKey: openaiApiKey });
  
//       return result.choices[0].text.trim();
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };
  
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
// router.get('/searchOffers', async (req, res) => {
//     const { title, type_offre, duration, location } = req.query;
  
//     const criteria = {};
//     if (title) criteria.title = title;
//     if (type_offre) criteria.type_offre = type_offre;
//     if (duration) criteria.duration = duration;
//     if (location) criteria.location = location;
  
//     if (Object.keys(criteria).length === 0) {
//       res.status(400).json({ message: 'At least one query parameter is required' });
//     } else {
//       const offers = await searchOffers(criteria);

//       if (!offers) {
//         res.status(500).json({ message: 'Failed to retrieve offers' });
//       } else {
//         res.status(200).json(offers);
//       }
//     }
// });

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



// Assigner une société à l'offre
router.put('/assign/:companyId/:offerId', async (req, res) => {
  const companyId = req.params.companyId;
  const offerId = req.params.offerId;

  try {
    // Trouver l'offre à partir de son ID
    const offer = await Offer.findOne({ _id: offerId });
    if (!offer) {
      return res.status(404).send('Offre non trouvée');
    }

    // Trouver la société à partir de son ID
    const company = await User.findOne({ _id: companyId });
    if (!company) {
      return res.status(404).send('Société non trouvée');
    }

    // Assigner la société à l'offre
    offer.company = company._id;
    await offer.save();

    res.status(200).send('Société assignée à l\'offre avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur de serveur');
  }
});


//------------------------- Display Offers by company Id ---------------------------------//
router.get('/Display_offers/:companyId', async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const offers = await Offer.find({ company: companyId });

    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur de serveur');
  }
});

//------------------------- Display Offers by company Name ---------------------------------//
router.get('/DisplayOffers/:companyName', async (req, res) => {
  try {
    const companyName = req.params.companyName;
    const company = await User.findOne({ name: companyName });

    if (!company) {
      return res.status(404).send('Société non trouvée');
    }

    const offers = await Offer.find({ company: company._id });

    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur de serveur');
  }
});

//---------------------------------- Upload Image --------------------------------------------------//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/offers');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


router.post('/uploadImg', upload.single('image'), (req, res) => {
  const fileName = req.file.filename;
  res.send(`Image uploaded: ${fileName}`);
});


//-------------------------------- Add Offer  with Image ----------------------------------------------//
// router.post('/addOfferImg', upload.single('image'), async (req, res) => {
//   try {
//     const { title, type_offre,description, availability,duration,location } = req.body;

//      // Check if a file is present in the request
//      if (!req.file.path) {
//       return res.status(400).send('No file uploaded');
//     }

//     // Check for upload errors
//     if (req.fileValidationError) {
//       return res.status(400).send(req.fileValidationError);
//     }


//     const offer = new Offer({
//       title,
//       type_offre,
//       description,
//       availability,
//       duration,
//       location,
//       image: req.file.path,
//     });

//     await offer.save();
//     res.status(201).send(offer);

//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });
router.post('/addOfferImg', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const { title, type_offre, description, availability, duration, location } = req.body;
    const offer = new Offer({
      title,
      type_offre,
      description,
      availability,
      duration,
      location,
      image: req.file.path,
    });
    await offer.save();
    res.status(201).send(offer);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});





module.exports = router;