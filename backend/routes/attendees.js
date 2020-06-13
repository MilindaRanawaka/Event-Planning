const router = require("express").Router();
let Attendees = require("../models/attendees.model");

//@route GET
//@desc Get All Attendees
router.route("/").get((req, res) => {
    Attendees.find()
        .then((attendees) => res.json(attendees))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route POST
//@desc Add New Attendee
router.route("/add").post((req, res) => {
    const eventID = req.body.attEventID;
    const userID = req.body.attUserID;

    const newAttendees = new Attendees({
        eventID,
        userID,
    });

    newAttendees
        .save()
        .then(() => res.json("Attendee added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Get Specific Attendee Using ID
router.route("/:id").get((req, res) => {
    Attendees.findById(req.params.id)
        .then((attendees) => res.json(attendees))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route DELETE
//@desc Delete Specific Attendee Using ID
router.route("/:id").delete((req, res) => {
    Attendees.findByIdAndDelete(req.params.id)
        .then(() => res.json("Attendee deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Filter Attendees by Given Event ID
router.route("/find/:name").get((req, res) => {
    Event.find({ eventID: { $regex: req.params.eventID } })
        .then((attendees) => res.json(attendees))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Filter Attendees by Given User ID
router.route("/find/:name").get((req, res) => {
    Event.find({ userID: { $regex: req.params.userID } })
        .then((attendees) => res.json(attendees))
        .catch((err) => res.status(400).json("Error: " + err));
});

//Export Route
module.exports = router;