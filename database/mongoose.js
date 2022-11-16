const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(`mongodb+srv://chrono:${process.env.PASS}@cluster0.alikqpp.mongodb.net/?retryWrites=true&w=majority`, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Connected to Database');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Disonnected to Database');
        });

        mongoose.connection.on('err', (err) => {
            console.log(`Error with Connection: ${err}`);
        });
    }
}