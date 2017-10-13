const Command = require('./commandModel');
const commandController = {};

commandController.findCommand = (req, res) => {
    let text = new RegExp(req.query.command);

    Command.findOne({ commandString: text }, (err, result) => {
      if (err) console.log(err);
      if (result) res.send(result);
      else res.send('NA');
    });
};

module.exports = commandController;
