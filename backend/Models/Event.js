const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: false },
  location: {
    type: String,
    required: false,
    enum: ["Onsite", "Remote", "Hybride"],
  },
  address: { type: String, required: false },
  category: {
    type: String,
    required: false,
    enum: [
      "SPORTS",
      "BUSINESS",
      "POLITICAL",
      "TECHNOLOGY",
      "DESIGN",
      "MARKETING",
    ],
  },
  imagePath: { type: String, required: false },
  startDate: { type: Date, required: false },
  moreInfo: { type: String, required: false },
  user: { type: String, required: false },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;