// models/Patient.js
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  medicalHistory: [{
    date: Date,
    description: String
  }],
  medications: [{
    name: String,
    dosage: String
  }],
  labResults: [{
    date: Date,
    test: String,
    result: String
  }]
});

module.exports = mongoose.model('Patient', PatientSchema);
