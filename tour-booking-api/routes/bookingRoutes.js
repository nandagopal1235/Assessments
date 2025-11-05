const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings } = require('../controllers/bookingController');

router.route('/')
  .get(getAllBookings)
  .post(createBooking);

module.exports = router;
