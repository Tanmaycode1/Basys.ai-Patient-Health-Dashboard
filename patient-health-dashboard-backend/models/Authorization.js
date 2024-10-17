// models/Authorization.js
const mongoose = require('mongoose');

const AuthorizationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  treatmentType: {
    type: String,
    required: true
  },
  insurancePlan: {
    type: String,
    required: true
  },
  dateOfService: {
    type: Date,
    required: true
  },
  diagnosisCode: {
    type: String,
    required: true
  },
  cpTcode: String,
  estimatedCost: Number,
  additionalNotes: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending'
  },
  reviewerComments: String,
  reviewDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Authorization', AuthorizationSchema);