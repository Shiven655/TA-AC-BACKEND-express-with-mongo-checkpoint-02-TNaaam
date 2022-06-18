let express = require('express');
var router = express.Router();
let Event = require('../models/event');
let Remark = require('../models/remark');

router.get('/new', (req, res) => {
  res.render('createEvent');
});
router.get('/', (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) return next(err);
    res.render('events.ejs', { events: events });
  });
});
router.post('/', (req, res, next) => {
  Event.create(req.body, (err, createdevent) => {
    if (err) return next(err);
    res.redirect('/events');
  });
});
//fetch only one event
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Event.findById(id, (err, event) => {
    if (err) return next(err);
    res.render('eventDetails', { event });
  });
});
module.exports = router;
