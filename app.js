'use strict';
const express = require('express');
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const mongoose = require('mongoose');
const talksRoute = require('./routes/talks');

const app = express();
mongoose.connect("mongodb://heroku_9kl32k7z:3k41i3e9en5in38erd813eu4o8@ds031847.mlab.com:31847/heroku_9kl32k7z", { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', (err) => {
    console.log('connection error: ', err);
})
db.once('open', () => {
    console.log('db connection successful');
});

app.use(logger("dev"));
app.use(jsonParser());
app.use((req, res, next) => {
    res.header("Acces-Control-Allow-Origin", "*");
    res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header("Acces-Control-Allow-Methods", "PUT, POST, DELETE");
        return res.status(200).json({});
    }
    next();
})
app.use('/talks', talksRoute);

app.use((req, res, next) => {
    let err = new Error("Not found");
    err.status = 404;
    next(err);
})
//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Express Server is listening on ' + port)
});
