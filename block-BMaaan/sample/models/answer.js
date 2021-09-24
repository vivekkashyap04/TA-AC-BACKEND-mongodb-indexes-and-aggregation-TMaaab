const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    answer: String,
    upvote: { type: Number, default: 0 },
    downVote: { type: Number, default: 0 },
    reply: { type: Schema.Types.ObjectId, ref: 'Replies' },
    question: [{ type: mongoose.types.ObjectId, ref: 'Question' }],
    createdBy: { type: mongoose.types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Answer', answerSchema);
