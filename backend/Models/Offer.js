const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Offer;

// Vérifier si le modèle a déjà été défini
if (mongoose.models.Offer) {
  // Supprimer le modèle existant
  delete mongoose.models.Offer;
}

// Définir le modèle
const offerSchema = new mongoose.Schema({
  title: { type: String, required: true},
    type_offre: { type: String},
    description: { type: String},
    availability: { type: String}, //online or not or full-time
    startDate: { type: Date},
    endDate: { type: Date},
    duration: { type: String},
    location: { type: String},
    nb_places_available: { type: Number},
    languages: { type: String, enum: ['arabic', 'french', 'english', 'german', 'italian', 'spanish', 'chinese', 'japanese', 'korean'] },
    skills: [{ type: String }],
    tags: [String],
    image: { type: String  },

    company:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  Candidacies: [{ type: mongoose.Types.ObjectId, ref: 'Candidacy' }],
  category:{
    type:Schema.Types.ObjectId,
    ref:"Category"
  },
  quizzes: [{
    type: Schema.Types.ObjectId,
    ref: "Quiz"
  }]
});

Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
