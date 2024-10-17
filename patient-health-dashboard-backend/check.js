// scripts/verifyAdminUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

async function verifyAdminUser() {
  try {
    const adminUser = await User.findOne({ username: 'admin' });
    if (adminUser) {
      console.log('Admin user found:', adminUser);
    } else {
      console.log('Admin user not found');
    }
  } catch (error) {
    console.error('Error verifying admin user:', error);
  } finally {
    mongoose.connection.close();
  }
}

verifyAdminUser();