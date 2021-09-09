const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const FormSchema = new mongoose.Schema({
  mem_count: {
    type: Number,
  },

  mem1: {
    type: String,
    uppercase: true,
  },

  mem2: {
    type: String,
    uppercase: true,
  },
  mem3: {
    type: String,
    uppercase: true,
  },
  s_internal: {
    type: String,
    trim: true,
  },
  s_external: {
    type: String,
    trim: true,
  },
  s_proj_title: {
    type: String,
    trim: true,
  },
  s_organization: {
    type: String,
    trim: true,
  },
  project_description: {
    type: String,
    trim: true,
  },
});

const form = mongoose.model("formdata", FormSchema);
module.exports = form;
