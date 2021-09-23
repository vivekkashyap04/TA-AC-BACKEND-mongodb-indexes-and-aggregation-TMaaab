const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: { type: String, unique: true },
  email: String,
  address: {
    city: String,
    state: String,
    country: String,
    pin: Number,
  },
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ country: 1, state: 1 });

module.exports = mongoose.model('User', userSchema);
