const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CutlerySchema = new Schema({
  code: String,
  name: String,
  count: Number,
});

module.exports = CutlerySchema;
