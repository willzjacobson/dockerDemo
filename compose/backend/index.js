const mongoose = require('mongoose');
const app = require('express')();

// Variables passed in by docker-compose
const { PORT, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_HOST, DB } = process.env;

const dbConnectionString = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}/${DB}`;

const freshThoughts = require('./thoughts');  // Content to be inserted into DB
const Thought = mongoose.model('Thought', { content: String }); // initialize mongoose model


// ===== CONNECT TO DB AND START SERVER =====

let serverStarted = false;
(function connectToDB() {

    mongoose.connect(dbConnectionString, { useNewUrlParser: true });
    const db = mongoose.connection;
    
    // If fail to connect to DB, try again.
    db.on('error', () => {
        console.log('Failed to connect to DB, trying again.');
        setTimeout(connectToDB, 1000);
    });

    // Once connected to DB, define mongood model and start express server
    db.once('open', async () => {
        console.log('Connected to DB, starting server.')
        if (!serverStarted) {
            app.listen(PORT, () => console.log(`The server is listening closely on port ${PORT}...`));
        }
        // Intentionally not put in callback so that we dont try to start the server twice
        serverStarted = true;
    });
})()


// ===== ROUTES =====

app.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch(err) {
        console.log('Failed to fetch thoughts', err);
        res.status(500).send(err);
    }
});

app.post('/', async (req, res) => {
    try {
        await Thought.insertMany(freshThoughts);
        res.sendStatus(201);
    } catch(err) {
        console.log('Failed to insert thoughts', err);
        res.status(500).send(err);
    }
});

app.delete('/', async (req, res) => {
    try {
        await Thought.deleteMany();
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch(err) {
        console.log('Failed to delete thoughts', err);
        res.status(500).send(err);
    }
});
