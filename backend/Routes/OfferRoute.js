const express = require("express");
const Offer = require('../Models/Offer');
const { requireAuth } = require("../middlewares/requireAuth");
const User = require("../models/User");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const natural = require('natural');


//AI
const AiController = require("../controllers/Ai.controller");
const { default: mongoose } = require("mongoose");



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
  console.log("aaaaaaa");

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
router.put('/AffectOffer/:idU/:idO', async(req,res)=>{
  try {
    console.log
    const idO=req.params.idO;
    console.log(idO);
    console.log(req.params.idU);

    const user = await User.findByIdAndUpdate(req.params.idU, { $push: { OfferIdC: idO } }, { new: true });

      if (user) {
          res.status(200).json(user);
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

//---------------------------------- Upload Image/File --------------------------------------------------//
//IMG
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/offers');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const upload = multer({ storage });

//FILE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/offers')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });


router.post('/uploadImg', upload.single('image'), (req, res) => {
  const fileName = req.file.filename;
  res.send(`Image uploaded: ${fileName}`);
});

router.post('/uploadFile', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
  // const offre_file = req.file.filename;
  // res.send(`File uploaded: ${offre_file}`);
});

router.get('/OfferFile', (req, res) => {
  const fileName = req.query.fileName;
  const offre_file = path.join(__dirname, '..','uploads', fileName);
console.log(offre_file);
  res.download(offre_file, error => {
    if (error) {
      console.error('Error while downloading file:', error);
      res.status(500).send('Error while downloading file');
    }
  });
});


//--------------------------- Cloudinary --------------------------------------------------//


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





// route pour télécharger l'image
router.post('/offer/image', uploadC.single('image'), async(req, res) => {
  // récupérer l'url de l'image téléchargée sur Cloudinary
  // const image = req.file.path;
  // res.send(image);
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

/----------------------- Assign Offers to Company2 -------------------------------------------------//
// Fonction pour associer une offre à une société
async function assignOfferToCompany(companyId, offerId) {
  // Récupérer la société avec l'identifiant donné
  const company = await User.findById(companyId.trim());

  // Ajouter l'identifiant de la nouvelle offre à la liste des offres de la société
  company.offers.push(offerId);

  // Sauvegarder les modifications dans la base de données
  await company.save();
}




// Route pour ajouter une offre à une société
router.post('/companies/:companyId/offers',upload.single('image') ,async (req, res) => {
  try {
    const { companyId } = req.params;

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
      image: req.file.path,


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



//AI
// router.route("/getRecommendation").get(AiController.getRecommendation);
// router.get("/getRecommendation", AiController.getRecommendation)



//---------------------------- AI ----------------------------------------//
//OK 5/5
// Entraînement du modèle de recommandation et stockage dans la base de données
// router.post('/offers/train-recommendation-model', async (req, res) => {
//   try {
//     //    const offers = await Offer.find({}, 'title description skills type_offre');
//     const offers = await Offer.find({ company: { $exists: true } }, 'skills ').populate('company');
//     const corpus = offers.map((offer) => {
//       const text = ` ${offer.skills.join(' ')}`;
//       return text.toLowerCase();
//     });
//     const tfidf = new natural.TfIdf();
//     corpus.forEach((doc) => {
//       tfidf.addDocument(doc);
//     });
//     const model = {};
//     offers.forEach((offer, index) => {
//       const tfidfScores = {};
//       tfidf.listTerms(index).forEach((term) => {
//         tfidfScores[term.term] = term.tfidf;
//       });
//       model[offer._id] = tfidfScores;
//     });
//     // Enregistrement du modèle dans la base de données
//     const Model = mongoose.model('RecommendationOffers', new mongoose.Schema({
//       model: Object,
//     }));
//     const recommendationModel = new Model({ model: model });
//     await recommendationModel.save();
//     res.status(200).json({ message: 'Le modèle de recommandation a été entraîné et enregistré avec succès.' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post('/offers/train-recommendation-model', async (req, res) => {
  try {
    const offers = await Offer.find({ company: { $exists: true } }, 'skills ').populate('company');
    const corpus = offers.map((offer) => {
      const text = ` ${offer.skills.join(' ')}`;
      return text.toLowerCase();
    });
    const tfidf = new natural.TfIdf();
    corpus.forEach((doc) => {
      tfidf.addDocument(doc);
    });
    const model = {};
    offers.forEach((offer, index) => {
      const tfidfScores = {};
      tfidf.listTerms(index).forEach((term) => {
        tfidfScores[term.term] = term.tfidf;
      });
      model[offer._id] = tfidfScores;
    });

    // Use the pre-defined schema and model to save the data
    const recommendationModel = new RecommendationModel({ model: model });
    await recommendationModel.save();

    res.status(200).json({ message: 'Le modèle de recommandation a été entraîné et enregistré avec succès.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//---------------------  SKill les plus demandées -------------------------------------------//
// router.get('/offers/company-skills/:companyId', async (req, res) => {
//   try {
//     const companyId = req.params.companyId;
//     const Model = mongoose.model('RecommendationOffers');
//     const recommendationModel = await Model.findOne({});
//     const model = recommendationModel.model;
//     const companyOffers = await Offer.find({ company: companyId });
//     const companySkills = {};

//     companyOffers.forEach((offer) => {
//       const offerId = offer._id.toString();
//       if (model.hasOwnProperty(offerId)) {
//         const offerSkills = model[offerId];
//         for (const skill in offerSkills) {
//           if (companySkills.hasOwnProperty(skill)) {
//             companySkills[skill] += offerSkills[skill];
//           } else {
//             companySkills[skill] = offerSkills[skill];
//           }
//         }
//       }
//     });

//     const sortedSkills = Object.entries(companySkills).sort((a, b) => b[1] - a[1]);
//     const topSkills = sortedSkills.slice(0, 10).map((skill) => skill[0]);

//     res.status(200).json({ topSkills });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


//------------------------------ GetRecommendations -------------------------------------------------------//
// Création du schéma pour le modèle RecommendationOffers
// router.get('/offers/company-skills/:companyId', async (req, res) => {
//   try {
//     const companyId = req.params.companyId;
//     const company = await User.findById(companyId);
//     const companyOffers = await Offer.find({ company: companyId });
//     const Model = mongoose.model('RecommendationOffers');
//     const recommendationModel = await Model.findOne({});
//     const model = recommendationModel.model;

//     const result = [];

//     companyOffers.forEach((offer) => {
//       const offerId = offer._id.toString();
//       if (model.hasOwnProperty(offerId)) {
//         const offerSkills = model[offerId];
//         const sortedSkills = Object.entries(offerSkills).sort((a, b) => b[1] - a[1]);
//         const topSkills = sortedSkills.slice(0, 10).map((skill) => skill[0]);

//         result.push({
//           offer: offer,
//           topSkills: topSkills,
//         });
//       }
//     });

//     res.status(200).json({ company: company.name, offers: result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/offers/company-skills/:companyId', async (req, res) => {
//   try {
//     const companyId = req.params.companyId;
//     const company = await User.findById(companyId);
//     const companyOffers = await Offer.find({ company: companyId });
//     const Model = mongoose.model('RecommendationOffers');
//     const recommendationModel = await Model.findOne({});
//     const model = recommendationModel.model;

//     const result = [];

//     companyOffers.forEach((offer) => {
//       const offerId = offer._id.toString();
//       if (model.hasOwnProperty(offerId)) {
//         const offerSkills = model[offerId];
//         const sortedSkills = Object.entries(offerSkills).sort((a, b) => b[1] - a[0]);
//         const topSkills = sortedSkills.slice(0, 10).map((skill) => {
//           return { name: skill[0], score: skill[1] };
//         });

//         result.push({
//           offer: offer,
//           topSkills: topSkills,
//         });
//       }
//     });

//     res.status(200).json({ company: company.name, offers: result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/offers/company-skills/:companyId', async (req, res) => {
//   try {
//     const companyId = req.params.companyId;
//     const company = await User.findById(companyId);
//     const companyOffers = await Offer.find({ company: companyId });
//     const Model = mongoose.model('RecommendationOffers');
//     const recommendationModel = await Model.findOne({});
//     const model = recommendationModel.model;

//     const result = [];

//     companyOffers.forEach((offer) => {
//       const offerId = offer._id.toString();
//       if (model.hasOwnProperty(offerId)) {
//         const offerSkills = model[offerId];
//         const sortedSkills = Object.entries(offerSkills).sort((a, b) => b[1] - a[0]);
//         const topSkills = sortedSkills.slice(0, 10).map((skill) => {
//           return { name: skill[0], score: skill[1] };
//         });

//         result.push({
//           offer: offer,
//           topSkills: topSkills,
//         });
//       }
//     });

//     res.status(200).json({ company: company.name, offers: result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/company-skills', async (req, res) => {
//   try {
//     const companies = await User.find({ role: 'company' });
//     const Model = mongoose.model('RecommendationOffers');
//     const recommendationModel = await Model.findOne({});
//     const model = recommendationModel.model;

//     const companySkills = {};

//     for (const company of companies) {
//       const companyOffers = await Offer.find({ company: company._id });
//       companySkills[company.name] = {};
      
//       companyOffers.forEach((offer) => {
//         const offerId = offer._id.toString();
//         if (model.hasOwnProperty(offerId)) {
//           const offerSkills = model[offerId];
//           for (const skill in offerSkills) {
//             if (companySkills[company.name].hasOwnProperty(skill)) {
//               companySkills[company.name][skill] += offerSkills[skill];
//             } else {
//               companySkills[company.name][skill] = offerSkills[skill];
//             }
//           }
//         }
//       });

//       const sortedSkills = Object.entries(companySkills[company.name]).sort((a, b) => b[1] - a[1]);
//       const topSkills = sortedSkills.slice(0, 10).map((skill) => {
//         return { name: skill[0], score: skill[1] };
//       });
      
//       companySkills[company.name] = topSkills;
//     }

//     res.status(200).json({ companySkills });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/company-skills', async (req, res) => {
//   try {
//     const companies = await User.find({ role: 'company' });
//     const Model = mongoose.model('RecommendationOffers');
//     const recommendationModel = await Model.findOne({});
//     const model = recommendationModel.model;

//     const companySkills = {};

//     for (const company of companies) {
//       const companyOffers = await Offer.find({ company: company._id });
//       companySkills[company.name] = {};
      
//       companyOffers.forEach((offer) => {
//         const offerId = offer._id.toString();
//         if (model.hasOwnProperty(offerId)) {
//           const offerSkills = model[offerId];
//           for (const skill in offerSkills) {
//             if (companySkills[company.name].hasOwnProperty(skill)) {
//               companySkills[company.name][skill] += offerSkills[skill];
//             } else {
//               companySkills[company.name][skill] = offerSkills[skill];
//             }
//           }
//         }
//       });

//       const totalScore = Object.values(companySkills[company.name]).reduce((acc, cur) => acc + cur, 0);
//       const sortedSkills = Object.entries(companySkills[company.name]).sort((a, b) => b[1] - a[1]);
//       const topSkills = sortedSkills.slice(0, 10).map((skill) => {
//         const percentage = (skill[1] / totalScore) * 100;
//         return { name: skill[0], score: skill[1], percentage: percentage.toFixed(2) };
//       });
      
//       companySkills[company.name] = topSkills;
//     }

//     res.status(200).json({ companySkills });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get('/company-skills', async (req, res) => {
  try {
    const companies = await User.find({ role: 'company' });
    const Model = mongoose.model('RecommendationOffers');
    const recommendationModel = await Model.findOne({});
    const model = recommendationModel.model;

    const companySkills = {};

    for (const company of companies) {
      const companyOffers = await Offer.find({ company: company._id });
      if (companyOffers.length > 0) {
        companySkills[company.name] = {};

        companyOffers.forEach((offer) => {
          const offerId = offer._id.toString();
          if (model.hasOwnProperty(offerId)) {
            const offerSkills = model[offerId];
            for (const skill in offerSkills) {
              if (companySkills[company.name].hasOwnProperty(skill)) {
                companySkills[company.name][skill] += offerSkills[skill];
              } else {
                companySkills[company.name][skill] = offerSkills[skill];
              }
            }
          }
        });

        const totalScore = Object.values(companySkills[company.name]).reduce((acc, cur) => acc + cur, 0);
        const sortedSkills = Object.entries(companySkills[company.name]).sort((a, b) => b[1] - a[1]);
        const topSkills = sortedSkills.slice(0, 10).map((skill) => {
          const percentage = (skill[1] / totalScore) * 100;
          return { name: skill[0], score: skill[1], percentage: percentage.toFixed(2) };
        });

        companySkills[company.name] = topSkills;
      }
    }

    res.status(200).json({ companySkills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const recommendationSchema = new mongoose.Schema({
  model: Object,
});

// Enregistrement du modèle avec Mongoose
const RecommendationModel = mongoose.model('RecommendationOffers', recommendationSchema);

async function getRecommendations(offerId) {
  // Recherche du modèle de recommandation dans la base de données
  const Model = RecommendationModel;
  const recommendationModel = await Model.findOne();

  // Obtention des scores de similarité pour l'offre donnée
  const offerScores = recommendationModel.model[offerId];

  // Tri des scores de similarité par ordre décroissant
  const sortedScores = Object.keys(offerScores).sort((a, b) => offerScores[b] - offerScores[a]);

  // Création de la liste d'offres recommandées
  const recommendations = [];
  for (const offerId of sortedScores) {
    const offer = await Offer.findById(offerId).populate('company', 'name');
    if (offer) {
      recommendations.push({
        offerId: offer._id,
        companyId: offer.company._id,
        companyName: offer.company.name,
        score: offerScores[offerId],
        skills: offer.skills
      });
    }
    if (recommendations.length >= 5) {
      break;
    }
  }

  return recommendations;
}
//-------------------- GET SKILLS BY COMPANY -------------------------------------------//
async function getSkillsByCompanyOffers(offerIds) {
  try {
    // Recherche des offres correspondantes
    const offers = await Offer.find({ _id: { $in: offerIds } }).populate('company');

    // Construction d'un objet contenant les scores pour chaque compétence
    const skillsScores = {};
    offers.forEach((offer) => {
      offer.skills.forEach((skill) => {
        skillsScores[skill] = skillsScores[skill] || 0;
        skillsScores[skill] += offer.modelScore;
      });
    });

    // Tri des compétences par score décroissant
    const sortedSkills = Object.keys(skillsScores).sort((a, b) => skillsScores[b] - skillsScores[a]);

    // Récupération des noms de sociétés
    const companies = offers.map((offer) => offer.company.name);

    // Retour des résultats
    return { companies: companies, skills: sortedSkills };
  } catch (err) {
    console.error(err);
    return null;
  }
}


//------------------------- GET 2 ---------------------------//
router.get('/company/:companyId/offers/recommendations/:offerId', async (req, res) => {
  try {
    const { companyId, offerId } = req.params;

    // Vérification que l'entreprise existe
    const company = await User.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: "L'entreprise n'existe pas." });
    }

    // Vérification que l'offre appartient à l'entreprise
    const offer = await Offer.findOne({ _id: offerId, company: companyId });
    if (!offer) {
      return res.status(404).json({ error: "L'offre n'existe pas ou n'appartient pas à l'entreprise." });
    }

    // Obtention des recommandations pour l'offre donnée
    const recommendations = await getRecommendations(offerId);

    // Filtrage des recommandations pour ne garder que celles appartenant à l'entreprise
    const companyRecommendations = [];
    for (const recommendation of recommendations) {
      const recommendedOffer = await Offer.findById(recommendation.offerId);
      if (recommendedOffer && recommendedOffer.company.equals(companyId)) {
        companyRecommendations.push(recommendation);
      }
    }

    // Obtention des compétences les plus demandées parmi les offres recommandées
    const recommendedOfferIds = companyRecommendations.map((rec) => rec.offerId);
    const { companies, skills } = await getSkillsByCompanyOffers(recommendedOfferIds);

    res.status(200).json({ recommendations: companyRecommendations, companies: companies, skills: skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



//GET Recommendation

// const getRecommendations = async (id) => {
//   try {
//     // Récupération du modèle de recommandation depuis la base de données
//     const Model = mongoose.model('RecommendationModel', new mongoose.Schema({
//       model: Object,
//     }));
//     const recommendationModel = await Model.findOne();
//     if (!recommendationModel) {
//       return [];
//     }
//     const model = recommendationModel.model;

//     // Calcul des scores de similarité entre l'offre donnée et toutes les autres offres
//     const scores = [];
//     const tfidf = new natural.TfIdf();
//     tfidf.addDocument(await getOfferText(id));
//     for (const offerId in model) {
//       const tfidfScores = model[offerId];
//       let score = 0;
//       tfidf.listTerms().forEach((term) => {
//         if (tfidfScores[term.term]) {
//           score += term.tfidf * tfidfScores[term.term];
//         }
//       });
//       if (score > 0) {
//         scores.push({ offerId, score });
//       }
//     }

//     // Tri des offres selon leurs scores de similarité décroissants
//     scores.sort((a, b) => b.score - a.score);

//     // Récupération des offres recommandées
//     const recommendations = [];
//     for (const score of scores) {
//       const recommendedOffer = await Offer.findById(score.offerId);
//       if (recommendedOffer && recommendedOffer._id.toString() !== id) {
//         recommendations.push({
//           offerId: recommendedOffer._id.toString(),
//           title: recommendedOffer.title,
//           description: recommendedOffer.description,
//           company: recommendedOffer.company.toString(),
//           type_offre: recommendedOffer.type_offre,
//           score: score.score,
//         });
//       }
//       if (recommendations.length === 10) {
//         break;
//       }
//     }
//     return recommendations;
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// };


//----------------------------- GET AI -----------------------------------------//
router.get('/company/:companyId/offers/recommendations/:offerId', async (req, res) => {
  try {
    const { companyId, offerId } = req.params;

    // Vérification que l'entreprise existe
    const company = await User.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: "L'entreprise n'existe pas." });
    }

    // Vérification que l'offre appartient à l'entreprise
    const offer = await Offer.findOne({ _id: offerId, company: companyId });
    if (!offer) {
      return res.status(404).json({ error: "L'offre n'existe pas ou n'appartient pas à l'entreprise." });
    }

    // Obtention des recommandations pour l'offre donnée
    const recommendations = await getRecommendations(offerId);

    // Filtrage des recommandations pour ne garder que celles appartenant à l'entreprise
    const companyRecommendations = [];
    for (const recommendation of recommendations) {
      const recommendedOffer = await Offer.findById(recommendation.offerId);
      if (recommendedOffer && recommendedOffer.company.equals(companyId)) {
        companyRecommendations.push(recommendation);
      }
    }

    res.status(200).json({ recommendations: companyRecommendations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/interns/:internId/offers/recommendations', async (req, res) => {
  try {
    const { internId } = req.params;

    // Vérification que le stagiaire existe
    const intern = await User.findById(internId);
    if (!intern) {
      return res.status(404).json({ error: "Le stagiaire n'existe pas." });
    }

    // Obtention des offres pour le modèle de recommandation
    const offers = await Offer.find({}, 'skills type_offre');
    const corpus = offers.map((offer) => {
      const text = ` ${offer.skills.join(' ')} ${offer.type_offre}`;
      return text.toLowerCase();
    });
    const tfidf = new natural.TfIdf();
    corpus.forEach((doc) => {
      tfidf.addDocument(doc);
    });

    // Obtention du modèle de recommandation
    const RecommendationModel = mongoose.model('RecommendationModel', new mongoose.Schema({
      model: Object,
    }));
    const model = await RecommendationModel.findOne();

    // Calcul des scores TF-IDF pour les offres
    const internCorpus = intern.skills.join(' ').toLowerCase();
    const tfidfScores = {};
    tfidf.listTerms(internCorpus).forEach((term) => {
      tfidfScores[term.term] = term.tfidf;
    });

    // Calcul des scores de similarité cosinus entre les offres et les compétences du stagiaire
    const similarities = {};
    for (const offer of offers) {
      let offerScore = 0;
      const offerCorpus = `${offer.skills.join(' ')} ${offer.type_offre}`.toLowerCase();
      tfidf.listTerms(offerCorpus).forEach((term) => {
        if (term.term in tfidfScores) {
          offerScore += term.tfidf * tfidfScores[term.term];
        }
      });
      similarities[offer._id] = offerScore;
    }

    // Triage des offres par ordre décroissant de score de similarité cosinus
    const sortedOffers = Object.keys(similarities).sort((a, b) => {
      return similarities[b] - similarities[a];
    });

    // Obtention des offres recommandées
    const recommendations = [];
    // for (const offerId of sortedOffers) {
    //   if (intern.appliedOffers.indexOf(offerId) === -1) {
    //     recommendations.push({
    //       offerId: offerId,
    //       score: similarities[offerId],
    //     });
    //   }
    //   if (recommendations.length >= 5) {
    //     break;
    //   }
    // }
    if (intern && intern.appliedOffers && Array.isArray(intern.appliedOffers)) {
      for (const offerId of sortedOffers) {
        if (intern.appliedOffers.indexOf(offerId) === -1) {
          recommendations.push({
            offerId: offerId,
            score: similarities[offerId],
          });
        }
        if (recommendations.length >= 5) {
          break;
        }
      }
    } else {
      console.error('Invalid intern object or appliedOffers property.');
    }

    res.status(200).json({ recommendations: recommendations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;