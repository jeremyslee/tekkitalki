const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandSchema = new Schema({
  commands:  [{type: String, required: true}],
  commandString: {type: String, required: true, unique: true} ,
  code: {type: String, required: true},
  fn: {type: String, required: true}
});

module.exports = mongoose.model('Command', commandSchema);
