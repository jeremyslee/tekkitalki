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
      existingFuncs: [],
      commandVars: [],
      onPageCode: [],
      lineCount: 9,
      insertWhere: 0,
      listenFail: false
    }
    this.oneCommand = this.oneCommand.bind(this);
    this.camelize = this.camelize.bind(this);
    this.getLineNumber = this.getLineNumber.bind(this);
    this.numWords = { 'one': 1, 'two': 2, 'to': 2, 'too': 2, 'three': 3, 'four': 4, 'for' : 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15 };
  }

  parseSpeech() {
    let string = this.state.speech.trim();
    let insertWhere;
    let numWords = this.numWords;
    string = string.replace('the clara', 'declare a').replace('sinclair', 'declare');
    [string, insertWhere] = this.getLineNumber(string);

    let self = this;
    const commands = this.state.allCommands;
    for (let i = 0; i < commands.length; i += 1) {
      if (string.indexOf(commands[i]) > -1) {
        let variable = string.replace(commands[i], '').trim();
        if (variable.length) {
          this.setState({
            commandVars: this.state.commandVars.concat(variable),
            insertWhere: insertWhere
          });
        }
        string = commands[i]
        break;
      }
    }
    console.log('command to find ', string);
    console.log('vars to keep ', this.state.commandVars);
    console.log('insert at', this.state.insertWhere);

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
            self.setState({
              listenFail: true
            });
          })
        }
        else {
          let obj = JSON.parse(xhr.responseText);

          // Runs all the functionality saved on the database object
          // i.e WHERE THE MAGIC HAPPENS
          eval(obj.fn);

          self.setState({
            lineCount: Math.max(self.state.onPageCode.length, 9)
          });
        }
      }
    }
    xhr.send();
  }

  getLineNumber(str) {
    let string = str;
    let matchLine, insertWhere;
    // regex returns array ['line number 5', '5']
    matchLine = string.match(/(?:on line number\ *)(\w+)/);
    if (!matchLine) matchLine = string.match(/(?:on line\ *)(\w+)/);
    if (!matchLine) matchLine = string.match(/(?:online number\ *)(\w+)/);
    if (!matchLine) matchLine = string.match(/(?:online\ *)(\w+)/);
    if (!matchLine) matchLine = string.match(/(?:on mine\ *)(\w+)/);
    if (matchLine && matchLine.length > 1) {
      insertWhere = parseInt(matchLine[1]);
      if (isNaN(insertWhere)) insertWhere = parseInt(this.numWords[matchLine[1]]);
      if (isNaN(insertWhere)) insertWhere = undefined;
    }
    if (insertWhere === undefined) insertWhere = this.state.onPageCode.length + 2;

    string = string.replace(/(?:on line number\ *)(\w+)/, '').replace(/(?:on line\ *)(\w+)/, '').replace(/(?:online number\ *)(\w+)/, '').replace(/(?:online\ *)(\w+)/, '').replace(/(?:on mine\ *)(\w+)/, '');
    return [string, insertWhere]
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
      listening: true,
      listenFail: false
    })
    artyom.initialize({
      lang:"en-GB",
      continuous:false,
      listen:true,
      debug:false,
      speed:1
    }).then(function(){
      console.log("Ready to work !");
    });

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
    });
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
        <Input loaded={this.state.loaded} oneCommand={this.oneCommand} speech={this.state.speech} listening={this.state.listening} listenFail={this.state.listenFail} />
      </div>
    );
  }
}

module.exports = Grid;
