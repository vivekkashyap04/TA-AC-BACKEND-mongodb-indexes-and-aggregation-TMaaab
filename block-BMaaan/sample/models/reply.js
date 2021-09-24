const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
  comment: String,
  question: { type: mongoose.types.ObjectId, ref: 'Question' },
  answers: { type: mongoose.types.ObjectId, ref: 'Answer' },
  upvote: { type: Number, default: 0 },
  downVote: { type: Number, default: 0 },
  createdBy: { type: mongoose.types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Replies', replySchema);
