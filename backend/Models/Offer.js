const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true},
    type_offre: { type: String, enum: ['summer', 'worker', 'pre-hiring', 'PFE', 'recherche'], default: 'summer' },
    description: { type: String, required: true},
    availability: { type: String, required: true}, //online or not or full-time
    startDate: { type: Date},
    endDate: { type: Date},
    duration: { type: String, required: true },
    location: { type: String, required: true},
    nb_places_available: { type: Number},
    languages: { type: String, enum: ['arabic', 'french', 'english', 'german', 'italian', 'spanish', 'chinese', 'japanese', 'korean'] },
    skills: [{ type: String }],
    tags: [String],

    company: { type: mongoose.Types.ObjectId, ref: 'User' },
    experience: { type: String },
    education: { type: mongoose.Schema.Types.ObjectId, ref: 'Education' },
    image: { type: String  },

});

const Offer = mongoose.model('Offer', offerSchema);


module.exports = Offer;
