const mongoose = require("mongoose");
const AdvisorFormSchema = new mongoose.Schema({
  name: String,
  pending: [String],
  accepted: [String],
  rejected: [String],
});
const AdvisorForm = mongoose.model(
  "AdvisorForm",
  AdvisorFormSchema,
  "AdvisorForm"
);
module.exports = AdvisorForm;
