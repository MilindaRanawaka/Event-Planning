const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Attendees Model
const attendeesSchema = new Schema(
    {
        eventID: { type: String, required: true, trim: true },
        userID: { type: String, required: true, trim: true }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("Attendees", attendeesSchema);

//Export Attendees
module.exports = User;