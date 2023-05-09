const offer_data = require('../Models/Offer');
const score_data = require("../Models/Score");
const mongoose = require("mongoose");
const fuzzy = require("../utils/fuzzy");


//Search the boook from particular query from search bar
exports.getOffer = async (req, res) => {
    const offer_found = await fuzzy.search(req.query.keyword);
    // console.log(books_found);
    res.json({
      offers: offer_found,
    });
};

//Get all the books in paginated form.
exports.getAllOffers = async (req, res) => {
    const limit = 5;
    let req_skip = limit * parseInt(req.query.page || 1);
    const offersListData = await offer_data
      .find()
      .limit(40)
      .skip(req_skip)
      .sort("_id");
    res.json({
        offersListData,
    });
};

//Gettting recommendation for the book clicked and by specified rating Euclidian and Cosine Similarity
exports.getRecommendation = async (req, res) => {
    const limitofbooks = 12;
    const matched_results = await score_data.find({
      isbn: req.query.isbn * 1,
    });
    let arr = [];

    if (matched_results.length != 0) {
        matched_results[0].rating.forEach((obj) => {
          arr.push(obj.id * 1);
        });
    }

    const recommendCos = await offer_data.aggregate([
        {
          $match: {
            _id: {
              $in: arr,
            },
          },
        },
        {
          $limit: 8,
        },
    ]); // Okaye


    let diff = limitofbooks - recommendCos.length;
    let recommendadtion = await offer_data.aggregate([
        {
            $match: {
              _id: { $ne: req.query._id },
            },
          },
          {
            $project: {
            //   _id: 1,
              title: 1,
              type_offre:1,
              description: 1,
              availability:1,
              location: 1,
              nb_places_available:1,
              distance: {
                //Calculating the Euclidian distance for the recommendation
                $sqrt: {
                  $add: [
                    {
                      $pow: [{ $subtract: [Number(req.rating), "$rating"] }, 2],
                    },
                    {
                      $pow: [
                        { $subtract: [Number(req.numRatings), "$numRatings"] },
                        2,
                      ],
                    },
                  ],
                },
              },
            },
          },
          {
            $match: {
              distance: { $ne: null },
            },
          },
          {
            $sort: { distance: 1 },
          },
          {
            $limit: diff,
          },
    ]);

    recommendadtion = recommendCos.concat(recommendadtion);
    res.json({
      //Sending the Data through JSON format Recommmended
      recommendadtion,
    });
};
  


