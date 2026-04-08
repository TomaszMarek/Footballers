const mongoose = require('mongoose');
const Footballer = require('./models/Footballer');
const players = require('./playersData');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');
        await Footballer.deleteMany({});
        console.log('Existing data deleted');
        await Footballer.insertMany(players);
        console.log('New data inserted');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
