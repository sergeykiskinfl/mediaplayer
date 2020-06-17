const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
const { getAllTracks } = require("./tracks");

//Allow cross-origin
app.use(cors());
app.options("*", cors());

app.get("/tracks", getAllTracks);

exports.api = functions.region("europe-west1").https.onRequest(app);
