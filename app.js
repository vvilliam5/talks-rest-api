'use strict';
const express = require('express');
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const mongoose = require('mongoose');
const talksRoute = require('./routes/talks');

const app = express();
const port = process.eventNames.PORT || 3000;
mongoose.connect("mongodb://localhost:27017/talksApi", { useNewUrlParser: true, useUnifiedTopology: true });
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

app.listen(port, () => {
    console.log('Express Server is listening on ' + port)
});
