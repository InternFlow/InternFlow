const express = require("express");
const Event = require("../Models/Event");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const EmailSender = require("./Participantmail.js");
// Set up multer middleware to handle file uploads
// const upload = multer({ dest: "uploads/" });
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create an instance of the multer middleware
const upload = multer({ storage: storage });

// Handle POST request to /Event/addevent
router.post("/addevent", upload.single("imagePath"), (req, res) => {
  // const imagePath = req.file.path;

  const imagePath = req.file.filename;
  const title = req.body.title;
  const creator = req.body.creator;
  const description = req.body.description;
  const location = req.body.location;
  const address = req.body.address;
  const category = req.body.category;
  const startDate = req.body.startDate;
  const moreInfo = req.body.moreInfo;
  const user = req.body.user;
  const status = req.body.status;

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
    status,
    user,
  });
  console.log(newEvent);
  newEvent
    .save()
    .then(() => {
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

//update

router.put("/updateevent/:id", async (req, res) => {
  const eventid = req.params.id;

  const {
    title,
    description,
    creator,
    location,
    category,
    moreInfo,
    startDate,
    address,
  } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventid,
      {
        title,
        description,
        creator,
        location,
        category,
        moreInfo,
        startDate,
        address,
      },
      { new: true }
    );
    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).json({ errorMessage: "Event not found" });
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    res.status(500).json({ errorMessage: "Failed to update course" });
  }
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

//get specific User Events

router.get("/UserEvents/:id", async (req, res) => {
  try {
    const events = await Event.find({ user: req.params.id });

    res.json(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

////Search
router.get("/search", async (req, res) => {
  const searchText = req.query.query;
  if (!searchText) {
    res.status(400).json({ message: "Query parameter is required" });
  } else {
    const regex = new RegExp(searchText, "i");
    try {
      const events = await Event.find({
        $or: [
          { title: { $regex: regex } },
          { creator: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      });
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve Events" });
    }
  }
});

router.get("/Event/:id", async (req, res) => {
  id = req.params.id;
  try {
    const event = await Event.findById(id);
    res.json(event);
  } catch (err) {
    res.status(500).send(err);
  }
});
///

router.put("/Eventstatus/:id", async (req, res) => {
  const id = req.params.id;
  const newstatus = req.body.status;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { status: newstatus },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).send(err);
  }
});

///add participant to course List
router.post("/addparticipant/:id", async (req, res) => {
  const eventId = req.params.id;
  const { name, lastName, email } = req.body;
  console.log(lastName);

  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $push: { participants: { name, lastName, email } } },
      { new: true }
    );
    res.json(event);
    EmailSender({ event, email });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
