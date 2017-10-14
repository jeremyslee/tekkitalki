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
      existingVars: [],
      commandVars: [],
      onPageCode: [],
      lineCount: 9
    }
    this.oneCommand = this.oneCommand.bind(this);
    this.camelize = this.camelize.bind(this);
  }

  parseSpeech() {
    let string = this.state.speech.trim();
    let self = this;
    let numWords = { 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'for' : 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15 }
    const commands = this.state.allCommands;
    for (let i = 0; i < commands.length; i += 1) {
      if (string.indexOf(commands[i]) > -1) {
        let variable = string.replace(commands[i], '').trim();
        if (variable.length) {
          this.setState({
            commandVars: this.state.commandVars.concat(variable)
          });
        }
        string = commands[i]
        break;
      }
    }
    console.log('command to find ', string);
    console.log('vars to keep ', this.state.commandVars);
    // LOOK UP COMMAND IN DB

    let xhr = new XMLHttpRequest();
    xhr.open("GET", this.props.baseUrl + '/find/?command=' + encodeURIComponent(string));

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText === 'NA') {
          console.log('No such command.');

          artyom.initialize({
                        lang:"en-GB",
                        continuous:false,
                        listen:false,
                        debug:false,
                        speed:1
                    }).then(function(){
                        artyom.say('Sorry, your technical communication is poor.');
                    })
        }
        else {
          let obj = JSON.parse(xhr.responseText);
          eval(obj.fn);






          self.setState({
            lineCount: Math.max(self.state.onPageCode.length, 9)
          })
        }
      }
    }
    xhr.send();

  }

  camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
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
          loaded: true
        });

      }
    }
    xhr.send();
  }

  render () {
    return (
      <div>
        <Editor loaded={this.state.loaded} onPageCode={this.state.onPageCode} lineCount={this.state.lineCount} />
        <Input loaded={this.state.loaded} oneCommand={this.oneCommand} speech={this.state.speech} listening={this.state.listening} />
      </div>
    );
  }
}

module.exports = Grid;
