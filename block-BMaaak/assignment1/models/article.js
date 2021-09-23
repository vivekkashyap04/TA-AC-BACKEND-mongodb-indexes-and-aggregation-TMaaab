const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
});

articleSchema.index({ title: 'text' });
articleSchema.index({ tags: 1 });
articleSchema.index({ description: 'text' });

module.exports = mongoose.model('Article', articleSchema);
