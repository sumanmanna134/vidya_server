const admin = require("firebase-admin");
const serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vidya-admin.firebaseio.com",
});

const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true});

module.exports = {
  admin, db, serviceAccount,
};
