const Command = require('./commandModel');

const commandController = {};

commandController.findCommand = (req, res) => {
  const text = new RegExp(req.query.command);
  Command.findOne({ commandString: text }, (err, result) => {
    if (err) console.log(err);
    if (result) res.send(result);
    else res.send('NA');
  });
};

commandController.addCommand = (req, res) => {
  const cmdToSave = req.body;
  const command = new Command(cmdToSave);
  command.save((err, result) => {
    if (err) res.send(err);
    else {
      res.send(result);
    }
  });
};

commandController.findAll = (req, res) => {
  Command.find({}, (err, result) => {
    if (err) console.log(err);
    const flatArr = result.reduce((acc, curr) => {
      acc = acc.concat(curr.commands);
      return acc;
    }, []);
    res.send(flatArr);
  });
};


module.exports = commandController;
