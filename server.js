const app = require('./app');

const port = process.env.PORT || 3000;

const irb = `mongodb+srv://${process.env.CONTACTS_DB_USER}:${process.env.CONTACTS_DB_PASSWORD}@mycontactsappasies.mbffy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Start server
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function () {
    // we're connected!
    app.listen(Number(process.env.PORT), function () {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
});