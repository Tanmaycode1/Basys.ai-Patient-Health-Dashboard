const express = require('express');
const router = express.Router();
const Authorization = require('../models/Authorization');
const auth = require('../middleware/auth');  // Make sure this path is correct

// Get all authorizations
router.get('/', auth, async (req, res) => {
  try {
    const authorizations = await Authorization.find();
    res.json(authorizations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/patient/:patientId', auth, async (req, res) => {
    try {
      const authorizations = await Authorization.find({ patientId: req.params.patientId });
      res.json(authorizations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Get a single authorization
router.get('/:id', auth, async (req, res) => {
  try {
    const authorization = await Authorization.findById(req.params.id);
    if (!authorization) {
      return res.status(404).json({ message: 'Authorization not found' });
    }
    res.json(authorization);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new authorization
router.post('/', auth, async (req, res) => {
  const authorization = new Authorization({
    patientId: req.body.patientId,
    providerId: req.user.id,  // This assumes the auth middleware adds the user to the request
    treatmentType: req.body.treatmentType,
    insurancePlan: req.body.insurancePlan,
    dateOfService: req.body.dateOfService,
    diagnosisCode: req.body.diagnosisCode,
    cpTcode: req.body.cpTcode,
    estimatedCost: req.body.estimatedCost,
    additionalNotes: req.body.additionalNotes,
  });

  try {
    const newAuthorization = await authorization.save();
    res.status(201).json(newAuthorization);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get authorization by ID
async function getAuthorization(req, res, next) {
  let authorization;
  try {
    authorization = await Authorization.findById(req.params.id);
    if (authorization == null) {
      return res.status(404).json({ message: 'Cannot find authorization' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.authorization = authorization;
  next();
}

// Review an authorization
router.patch('/:id/review', async (req, res) => {
    try {
      const { status, reviewerComments } = req.body;
      const authorization = await Authorization.findByIdAndUpdate(
        req.params.id,
        { 
          status, 
          reviewerComments, 
          reviewDate: Date.now() 
        },
        { new: true }
      );
      if (!authorization) {
        return res.status(404).json({ message: 'Authorization not found' });
      }
      res.json(authorization);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;