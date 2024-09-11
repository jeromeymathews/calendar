const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return this.authType === 'email';
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  authType: {
    type: String,
    required: true,
    enum: ['google', 'apple', 'microsoft', 'email'],
    default: 'email'
  },
  authProviderId: {
    type: String,
    sparse: true
  },
  profilePicture: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

// Add any pre-save hooks, methods, or statics here

const User = mongoose.model('User', UserSchema);

module.exports = User;
