const express = require("express");
const Offer = require('../Models/Offer');
const router = express.Router();


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




module.exports = router;