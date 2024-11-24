const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  //Personal Details
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  DOB: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },

  //Office Purpose
  post: {
    type: String,
  },
  years: {
    type: String,
  },
  department: {
    type: String,
  },
  division: {
    type: String,
  },
  officeLocation: {
    type: String,
  },
  remoteLocation: {
    type: String,
  },
  reportsTo: {
    type: String,
  },

  //work shift
  dayShift: {
    type: String,
  },
  nightShift: {
    type: String,
  },
  leaves: {
    type: String,
  },
});

module.exports = mongoose.model("employee", EmployeeSchema);
