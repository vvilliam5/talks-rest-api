'use strict';
const express = require('express');
const router = express.Router();
const Talks = require('../models').Talk;
const Attendees = require('../models').Attendee;

router.param('id', (req, res, next, id) => {
    Talks.findById(id, (err, doc) => {
        if (err) return next(err);
        if (!doc) {
            err = new Error('Not found');
            err.status = 404;
            return next(err);
        }
        req.talk = doc;
        return next();
    });
});

//route to get list of all talks
router.get('/', (req, res, next) => {
    Talks.find({}, null, (err, talks) => {
        if (err) return next(err);
        res.json(talks);
    })
})
//route to add new talk
router.post('/', (req, res, next) => {
    let talk = new Talks(req.body);
    talk.save((err, talk) => {
        if (err) return next(err);
        res.status(201);
        res.json(talk);
    })
})
//route to view talk by id
router.get('/:id', (req, res) => {
    res.json(req.talk);
})
//route to delete talk
router.delete('/:id', (req, res, next) => {
    req.talk.remove((err) => {
        if (err) return next(err)
        return next();
    })
})
//route to add new attendee to talk
router.post('/:id/attendee', (req, res) => {
    let attendee = new Attendees(req.body);
    attendee.save((err, attendee) => {
        if (err) return next(err);
        res.status(201);
        res.json(attendee);
    })
})
//route to get attendees for a talk
router.get('/:id/attendee', (req, res) => {
    Attendees.find({ talkID: req.params.id }, (err, attendees) => {
        if (err) return next(err);
        res.json(attendees);
    })
})
//route to get attendee by id
router.get('/:id/attendee/:aID', (req, res) => {
    Attendees.findById(req.params.aID, (err, attendee) => {
        if (err) return next(err);
        res.json(attendee);
    })
})

module.exports = router;