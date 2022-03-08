const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const ProposalSchema = new mongoose.Schema({
  category: {
    type: String,
    trim: true,
  },
  characteristics: {
    type: String,
    trim: true,
  },
  reason: {
    type: String,
    trim: true,
  },
  outline: {
    type: String,
    trim: true,
  },
  objectives: {
    type: String,
    trim: true,
  },
  scope: {
    type: String,
    trim: true,
  },
  methodology: {
    type: String,
    trim: true,
  },
  exp_outcomes: {
    type: String,
    trim: true,
  },
  exp_budget: {
    type: String,
    trim: true,
  },
  alignment: {
    type: String,
    trim: true,
  },
  co_supervisor: {
    type: String,
    trim: true,
  },
  RecommendationsandApproval: {
    type: String,
    trim: true,
  },
});

const proposal = mongoose.model("Proposal", ProposalSchema);
module.exports = proposal;
