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
    let string = this.state.speech;
    let self = this;
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

    let xhr = new XMLHttpRequest();
    xhr.open("GET", this.props.baseUrl + '/find/?command=' + encodeURIComponent(string));

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText === 'NA') {
          console.log('No such command.');
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
