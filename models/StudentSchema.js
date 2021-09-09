const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const form = require("./FormSchema");
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    uppercase: true,
  },
  groupid: {
    type: Number,
    default: 0,
  },
  s_name: {
    type: String,
    trim: true,
  },
  isSUBMIT: {
    type: Boolean,
    default: false,
  },
  isINVITE: {
    type: Boolean,
    default: false,
  },
  isACCEPTED: {
    type: Boolean,
    default: false,
  },
  s_rollno: {
    type: String,
    trim: true,
  },
  s_email: {
    type: String,
    trim: true,
  },
  s_batch: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  s_contact: {
    type: String,
    trim: true,
  },
  s_department: {
    type: String,
    trim: true,
  },
  s_status: {
    type: String,
    trim: true,
  },
  s_tokens: [
    {
      token: String,
    },
  ],
  formid: {type: Schema.Types.ObjectId, ref: "Form"},
  groupRequest: {
    type: String,
  },
  ResponseCount: {
    type: Number,
    trim: true,
    default: 0,
  },
});

studentSchema.pre("save", async function (req, res, next) {
  // console.log("run");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

studentSchema.methods.getToken = async function () {
  try {
    const tok = jwt.sign({_id: this._id.toString()}, process.env.SECRET);

    this.s_tokens = this.s_tokens.concat({token: tok});
    this.save();
    return tok;
  } catch (error) {
    console.log(error);
  }
};
const stu = "UndergradateStudents";
const student = mongoose.model("UndergradateStudents", studentSchema, stu);
// const doc = student();

module.exports = student;
