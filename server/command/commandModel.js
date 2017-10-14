const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandSchema = new Schema({
  commands:  [{type: String, required: true}],
  commandString: {type: String, unique: true} ,
  code: {type: String, required: true},
  fn: {type: String, required: true}
});


commandSchema.pre('save', function(next) {
  this.commandString = this.commands.join(',');
  next();
});

module.exports = mongoose.model('Command', commandSchema);
