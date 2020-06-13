const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//MongoDB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

//Routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const EventRouter = require("./routes/events");
app.use("/events", EventRouter);
const AttendeesRouter = require("./routes/attendees");
app.use("/attendees", AttendeesRouter);

//Production for hosting server
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../build"));
    app.get("*", (req, res) => {
        res.sendfile(path.resolve(__dirname, "..", "build", "index.html"));
    });
}
app.listen(port, () => {
    console.log("Server runs on port : " + port);
});