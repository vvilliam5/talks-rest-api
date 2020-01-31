'use strict';
const express = require('express');
const router = express.Router();
const Talks = require('../models').Talk;
const Attendees = require('../models').Attendee;

router.param('id', (req, res, next, id) => {
    Attendees.findById(id, (err, doc) => {
        if (err) return next(err);
        if (!doc) {
            err = new Error('Not found');
            err.status = 404;
            return next(err);
        }
        req.attendee = doc;
        return next();
    });
});

router.get('/', (req, res, next) => {
    Attendees.find({}, null, (err, attendees) => {
        if (err) return next(err);
        res.json(attendees);
    })
})
router.get('/:id', (req, res) => {
    res.json(req.attendee);
})
router.put('/:id', (req, res, next) => {
    req.attendee.update(req.body, (err, result) => {
        if (err) return next(err);
        res.json(result);
    })
})
router.delete('/:id', (req, res, next) => {
    req.attendee.remove((err) => {
        if (err) return next(err)
        return next();
    })
})
module.exports = router;