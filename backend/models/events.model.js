const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Event Model
const eventSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        time: { type: Date, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("Event", eventSchema);

//Export User
module.exports = User;