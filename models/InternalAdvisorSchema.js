const mongoose = require("mongoose");
const InternalAdvisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  advisorformid: {
    type: String,
    default: "NONE",
  },
});
const internalAdvisor = mongoose.model(
  "internalAdvisor",
  InternalAdvisorSchema,
  "internalAdvisor"
);
module.exports = internalAdvisor;
