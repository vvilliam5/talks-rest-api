'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TalksSchema = new Schema({
    topic: String,
    location: String,
    time: Date
});

let AttendeesSchema = new Schema({
    name: String,
    email: String,
    talkID: String
});

let Talk = mongoose.model('Talk', TalksSchema);
let Attendee = mongoose.model('Attendee', AttendeesSchema);

module.exports.Talk = Talk;
module.exports.Attendee = Attendee;

// {
// 	"topic": "Global Warming",
// 	"location": "San Franscisco"
// }

