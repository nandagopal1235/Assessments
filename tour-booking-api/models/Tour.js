const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tour", tourSchema);
