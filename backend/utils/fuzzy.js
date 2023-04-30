const Offer = require('../Models/Offer');


const search = async function (reqTitle) {
    const search_results = await Offer.find(
      { $text: { $search: `${reqTitle}` } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10);
    return search_results;
  };
  
  module.exports = { search };