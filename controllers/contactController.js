const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

//GET - Return all contacts in the DB
exports.findAllContacts = function (req, res) {

    Contact.paginate({}, { limit: req.query.limit, page: req.query.page }, function (err, docs) {
        if (err) { res.send(500, err.message) };

        console.log('GET /contacts')
        res.status(200).jsonp(docs);
    });

};

//GET - Return a Contact with specified ID
exports.findContact = function (req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

        console.log('GET /contacts/:id' + req.params.id);
        return res.status(200).jsonp(contact);
    });
};

// //POST - Insert a new Contact in the DB
exports.addContact = function (req, res) {
    if (!req.body.email) {
        return res.status(400).send({ 'message': 'incorrect data' })
    };
    const contact = new Contact({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        phoneNumber: req.body.phoneNumber,
        company: req.body.company,
        email: req.body.email,
        contactID: req.body.contactID
    });

    contact.save(function (err, contact) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(contact);
    });
};

//PUT - Update an existing contact with specified ID and new properties
exports.updateContact = function (req, res) {
    Contact.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, contact) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(contact);
    });
};

//DELETE - Delete a Contact with specified ID
exports.deleteContact = function (req, res) {
    Contact.findByIdAndDelete(req.params.id, function (err, contact) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send();
    });
};
