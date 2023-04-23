const express = require("express");
const Event = require("../Models/Event");
const router = express.Router();

// Handle POST request to /Event/addevent
router.post("/addevent", (req, res) => {
  const title = req.body.title;
  const creator = req.body.creator;
  const description = req.body.description;
  const location = req.body.location;
  const address = req.body.address;
  const category = req.body.category;
  const startDate = req.body.startDate;
  const moreInfo = req.body.moreInfo;
  const imagePath = req.body.imageBase64;
  const id = req.body.id;

  const newEvent = new Event({
    title,
    creator,
    description,
    location,
    address,
    category,
    startDate,
    moreInfo,
    imagePath,
    user: id,
  });

  newEvent
    .save()
    .then(() => {
      console.log(newEvent);
      res.status(200).json({ message: "Event created successfully" });
    })
    .catch((err) => res.status(400).json({ error: `Error: ${err}` }));
});

//delete event
router.delete("/deleteevent/:id", (req, res) => {
  const eventId = req.params.id;

  Event.findByIdAndRemove(eventId)
    .then(() => {
      res.send(`Event with ID ${eventId} has been deleted.`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while deleting the event.");
    });
});

// Get All Event

router.get("/allEvents", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

//Event Update
router.patch("/updateevent/:id", async (req, res) => {
  const id = req.params.id;
  const update = {};

  // build the update object based on the fields that are present in the request body
  if (req.body.title) {
    update.title = req.body.title;
  }
  if (req.body.description) {
    update.description = req.body.description;
  }
  if (req.body.creator) {
    update.creator = req.body.creator;
  }
  if (req.body.location) {
    update.location = req.body.location;
  }

  if (req.body.category) {
    update.category = req.body.category;
  }

  try {
    const options = { new: true }; // return the updated document
    const updatedEvent = await Event.findByIdAndUpdate(id, update, options);
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).send(err);
  }
});
