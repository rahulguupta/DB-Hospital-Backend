const mongoose = require('mongoose');

const ApointmentSchema = new mongoose.Schema({
 age: Number,
 doctor: String,
 address: String,
 bgroup: String,
 problem: String,
 date: String
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  appointments: [ApointmentSchema],
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);