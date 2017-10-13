const Command = require('./commandModel');
const commandController = {};

commandController.findCommand = (req, res) => {

};

commandController.addCommand = (req, res) => {
    let cmdToSave = req.body;
    let command = new Command(cmdToSave);
    command.save((err) => {
        if (err) console.log('Error: could not save');
        console.log("Saved successfully");
    });
}

module.exports = commandController;
