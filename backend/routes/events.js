const router = require("express").Router();
let Event = require("../models/events.model");

//@route GET
//@desc Get All Events
router.route("/").get((req, res) => {
    Event.find()
        .then((event) => res.json(event))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route POST
//@desc Add New Event
router.route("/add").post((req, res) => {
    const name = req.body.eventName;
    const description = req.body.eventDescription;
    const location = req.body.eventLocation;
    const time = req.body.eventTime;
    const addedBy = req.body.addedBy;

    const newEvent = new Event({
        name,
        description,
        location,
        time,
        addedBy,
    });

    newEvent
        .save()
        .then(() => res.json("Event added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Get Specific Event Using ID
router.route("/:id").get((req, res) => {
    Event.findById(req.params.id)
        .then((event) => res.json(event))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route DELETE
//@desc Delete Specific Event Using ID
router.route("/:id").delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json("Event deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route GET
//@desc Filter Event Name by Given Name
router.route("/find/:name").get((req, res) => {
    Event.find({ categoryName: { $regex: req.params.name } })
        .then((event) => res.json(event))
        .catch((err) => res.status(400).json("Error: " + err));
});

//@route POST
//@desc Update Event by using specific ID
router.route("/update/:id").post((req, res) => {
    console.log(req.params.categoryName);
    Event.findById(req.params.id)
        .then((event) => {
            event.name = req.body.eventName;
            event.description = req.body.eventDescription;
            event.location = req.body.eventLocation;
            event.time = req.body.eventTime;

            event
                .save()
                .then(() => res.json("Event updated!"))
                .catch((err) => {
                    console.log(err);
                    res.status(400).json("Error: " + err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

//Export Route
module.exports = router;