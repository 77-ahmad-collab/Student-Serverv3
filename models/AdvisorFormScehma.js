const mongoose = require("mongoose");
const AdvisorFormSchema = new mongoose.Schema({
  pending: [String],
  accepted: [String],
  rejected: [String],
  proposalPending: [String],
  proposalAccepted: [String],
  proposalRejected: [String],
});
const AdvisorForm = mongoose.model(
  "AdvisorForm",
  AdvisorFormSchema,
  "AdvisorForm"
);
module.exports = AdvisorForm;
