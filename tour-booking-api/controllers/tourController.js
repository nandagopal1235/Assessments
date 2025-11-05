const Tour = require("../models/Tour");

// Create new tour
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({ success: true, data: tour });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all tours
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({ success: true, count: tours.length, data: tours });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single tour
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ success: false, message: "Tour not found" });
    res.status(200).json({ success: true, data: tour });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: tour });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete tour
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ success: true, message: "Tour deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
