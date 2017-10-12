const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandSchema = new Schema({
  text: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('Command', commandSchema);
