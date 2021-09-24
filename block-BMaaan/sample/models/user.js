const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Questions' }],
  answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
  reputation: Number,
});

module.exports = mongoose.model('User', userSchema);
