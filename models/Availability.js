const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cbSun: {
    type: String,
    require: true,
  },
  cbMon: {
    type: String,
    require: true,
  },
  cbTues: {
    type: String,
    require: true,
  },
  cbWed: {
    type: String,
    require: true,
  },
  cbThur: {
    type: String,
    require: true,
  },
  cbFri: {
    type: String,
    require: true,
  },
  cbSat: {
    type: String,
    require: true,
  },
  mornShift: {
    type: String,
    require: true,
  },
  midShift: {
    type: String,
    require: true,
  },
  nightShift: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Availability", AvailabilitySchema);