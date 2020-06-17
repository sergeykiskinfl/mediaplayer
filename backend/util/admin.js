const admin = require("firebase-admin");

const serviceAccount = require("../YOUR_PATH_TO_JSON_FILE.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "YOUR_DATABASE_URL"
});

const db = admin.firestore();

module.exports = { admin, db };