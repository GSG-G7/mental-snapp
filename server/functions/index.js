const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const app = require('express')();

admin.initializeApp();

app.use(cors);

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

exports.api = functions.https.onRequest(app);
