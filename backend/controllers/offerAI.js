const natural = require('natural');
const mongoose = require('mongoose');
const Offer = require('../Models/Offer');


// Entraînement du modèle de recommandation
const trainModel = async () => {
    const offers = await Offer.find({}, 'title description skills type_offre');

    const corpus = offers.map((offer) => {
        const text = `${offer.title} ${offer.description} ${offer.skills.join(' ')} ${offer.type_offre}`;
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

  return model;
    
};

// Obtenir des recommandations pour une offre donnée
const getRecommendations = async (offerId) => {
    const model = await trainModel();
    const offer = await Offer.findOne({ _id: offerId }, 'skills type_offre');

    const tfidfScores = {};

    const text = `${offer.skills.join(' ')} ${offer.type_offre.join(' ')}`;
    const tokens = new natural.WordTokenizer().tokenize(text);

    tokens.forEach((token) => {
        const term = token.toLowerCase();
        if (tfidfScores[term]) {
          tfidfScores[term] += 1;
        } else {
          tfidfScores[term] = 1;
        }
    });
    
      const recommendations = [];

      Object.keys(model).forEach((id) => {
        if (id !== offerId) {
          const similarity = natural.JaroWinklerDistance(JSON.stringify(tfidfScores), JSON.stringify(model[id]));
          if (similarity > 0.5) {
            recommendations.push({ offerId: id, similarity });
          }
        }
    });
    
    return recommendations;
};
