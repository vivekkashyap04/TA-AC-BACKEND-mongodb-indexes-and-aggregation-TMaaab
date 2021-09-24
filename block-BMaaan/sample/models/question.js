const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: String,
    upvote: { type: Number, default: 0 },
    downVote: { type: Number, default: 0 },
    reply: { type: Schema.Types.ObjectId, ref: 'Replies' },
    tags: [String],
    viewOnquestion: Number,
    answers: [{ type: mongoose.types.ObjectId, ref: 'Answer' }],
    createdBy: { type: mongoose.types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

questionSchema.index({ tags: 1 });
module.exports = mongoose.model('Question', questionSchema);
