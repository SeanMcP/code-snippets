const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const SnippetSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  notes: String,
  language: String,
  tags: [String]
})

module.exports = mongoose.model('Snippet', SnippetSchema);
