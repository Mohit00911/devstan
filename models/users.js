const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
   
  },
  lastName: {
    type: String,
   
  },
  email: {
    type: String,
   
    unique: true,
  },
  password: {
    type: String,
   
  },
  accountType: {
    type: String,
    
  },
  phone: {
    type: String,
  
  },
  confirmPassword: {
    type: String,
   
  },
  addressLine1: {
    type: String,
  
  },
  addressLine2: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  specialRequests: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
