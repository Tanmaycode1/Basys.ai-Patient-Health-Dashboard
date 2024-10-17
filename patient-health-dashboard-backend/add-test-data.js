const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Patient = require('./models/Patient');
const Authorization = require('./models/Authorization');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const addTestData = async () => {
  try {
    // Add test patients
    const patient1 = await Patient.create({
      name: 'John Doe',
      age: 45,
      condition: 'Hypertension',
      medicalHistory: [
        { date: new Date('2023-01-15'), description: 'Annual check-up' },
        { date: new Date('2022-06-30'), description: 'Prescribed medication for blood pressure' },
      ],
      medications: [
        { name: 'Lisinopril', dosage: '10mg daily' },
        { name: 'Aspirin', dosage: '81mg daily' },
      ],
      labResults: [
        { date: new Date('2023-01-15'), test: 'Blood Pressure', result: '130/85 mmHg' },
        { date: new Date('2023-01-15'), test: 'Cholesterol', result: 'Total: 180 mg/dL' },
      ]
    });

    const patient2 = await Patient.create({
      name: 'Jane Smith',
      age: 32,
      condition: 'Diabetes',
      medicalHistory: [
        { date: new Date('2023-02-20'), description: 'Diabetes diagnosis' },
        { date: new Date('2022-08-15'), description: 'Routine check-up' },
      ],
      medications: [
        { name: 'Metformin', dosage: '500mg twice daily' },
      ],
      labResults: [
        { date: new Date('2023-02-20'), test: 'HbA1c', result: '7.1%' },
        { date: new Date('2023-02-20'), test: 'Fasting Blood Glucose', result: '126 mg/dL' },
      ]
    });

    // Add test authorization requests
    await Authorization.create({
      patientId: patient1._id,
      treatmentType: 'Cardiac Stress Test',
      insurancePlan: 'BlueCross BlueShield',
      dateOfService: new Date('2023-05-01'),
      diagnosisCode: 'I10',
      additionalNotes: 'Patient has family history of heart disease',
      status: 'pending'
    });

    await Authorization.create({
      patientId: patient2._id,
      treatmentType: 'Continuous Glucose Monitoring',
      insurancePlan: 'Aetna',
      dateOfService: new Date('2023-05-15'),
      diagnosisCode: 'E11.9',
      additionalNotes: 'Patient struggles with glucose management',
      status: 'approved'
    });

    console.log('Test data added successfully');
  } catch (error) {
    console.error('Error adding test data:', error);
  } finally {
    mongoose.disconnect();
  }
};

addTestData();
