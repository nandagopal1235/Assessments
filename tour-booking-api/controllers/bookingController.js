const Booking = require('../models/Booking');
const Tour = require('../models/Tour');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { tourId, name, email, people } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });

    const booking = await Booking.create({ tour: tourId, name, email, people });
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('tour');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
