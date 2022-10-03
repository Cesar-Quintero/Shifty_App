const mongoose = require("mongoose");

const taxPayrollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("taxPayroll", taxPayrollSchema);