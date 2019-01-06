const mongoose = require('mongoose');
const app = require('express')();

// Variables passed in by docker-compose
const { PORT, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, DB } = process.env;

const freshThoughts = require('./thoughts');  // Content to be inserted into DB
let Thought;  // Initilaize variable to hold mongoose model (defined below)


// ===== CONNECT TO DB AND START SERVER =====

mongoose.connect(`mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongo/${DB}`, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to db, initializing mongoose models and starting server...');

    // Define mongoose model
    Thought = mongoose.model('Thought', { content: String });

    // Start server
    app.listen(PORT, () => console.log(`The server is listening closely on port ${PORT}...`));
});


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
