var React = require('react');
var ReactDOM = require('react-dom');
import Artyom from "artyom.js"
const artyom = new Artyom();
const Editor = require('./editor');
const Input = require('./input');


class Grid extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
      speech: '',
      listening: false,
      allCommands: [],
      commandVars: []
    }
    this.oneCommand = this.oneCommand.bind(this);
  }

  parseSpeech() {
    let string = this.state.speech;
    const commands = this.state.allCommands;
    for (let i = 0; i < commands.length; i += 1) {
      if (string.indexOf(commands[i]) > -1) {
        this.setState({
          commandVars: this.state.commandVars.concat(string.replace(commands[i], '').trim())
        });
        string = commands[i]
        break;
      }
    }
    console.log('command to find ', string);
    console.log('vars to keep ', this.state.commandVars);
    // LOOK UP COMMAND IN DB
  }

  oneCommand() {
    let self = this;
    self.setState({
      speech: '',
      listening: true
    })
    artyom.initialize({
                  lang:"en-GB",
                  continuous:false,
                  listen:true,
                  debug:false,
                  speed:1
              }).then(function(){
                  console.log("Ready to work !");
              })

    artyom.on(['*'] , true).then((i, result) => {
                  self.setState({
                    speech: result,
                    listening: false
                  });
                  // artyom.say("There you go!");
                  artyom.fatality();
                  setTimeout(function() {
                    self.parseSpeech();
                  }, 0);
              });;
  }

  componentDidMount() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", this.props.baseUrl + '/commands/');

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.setState({
          allCommands: JSON.parse(xhr.responseText),
        });
      }
    }
    // xhr.send();

    // TEMP TEST
    let self = this;
    setTimeout(function() {
      self.setState({
        allCommands: ['declare a variable', 'initialize a variable'],
        loaded: true
      });
    }, 100);


  }

  render () {
    return (
      <div>
        <Editor loaded={this.state.loaded} />
        <Input loaded={this.state.loaded} oneCommand={this.oneCommand} speech={this.state.speech} listening={this.state.listening} />
      </div>
    );
  }
}

module.exports = Grid;
