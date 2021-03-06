require('dotenv').config();
const cors = require('cors');
const express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app),
  methodOverride = require("method-override");

// Middlewares
app.use(express.json());
app.use(methodOverride());
app.use(cors());
app.use(express.static('dist'));

// Import Models and controllers
require('./models/contactModel');
const ContactCtrl = require('./controllers/contactController');

const router = express.Router();

router.get('/contacts', function (req, res) {
  ContactCtrl.findAllContacts(req, res);
});

router.get('/contacts/:id', function (req, res) {
  ContactCtrl.findContact(req, res);
});

router.post('/contacts', function (req, res) {
  ContactCtrl.addContact(req, res);
});

router.delete('/contacts/:id', function (req, res) {
  ContactCtrl.deleteContact(req, res);
});

router.put('/contacts/:id', function (req, res) {
  ContactCtrl.updateContact(req, res);
});

app.use('/api', router);
module.exports = app