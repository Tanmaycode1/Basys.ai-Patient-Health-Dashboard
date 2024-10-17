// scripts/resetAdminPassword.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

async function resetAdminPassword() {
  try {
    const newPassword = '1234'; // This is the password you're trying to use
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findOneAndUpdate(
      { username: 'admin' },
      { 
        $set: { 
          password: hashedPassword,
          role: 'admin'
        }
      },
      { upsert: true, new: true }
    );

    console.log('Admin password reset successfully. New hashed password:', hashedPassword);
    console.log('Admin user details:', {
      id: updatedUser._id,
      username: updatedUser.username,
      role: updatedUser.role
    });
  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    mongoose.connection.close();
  }
}

resetAdminPassword();