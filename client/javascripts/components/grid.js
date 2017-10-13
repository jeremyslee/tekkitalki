var React = require('react');
var ReactDOM = require('react-dom');
import Artyom from "artyom.js"
const artyom = new Artyom();

class Grid extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      speech: ''
    }
    this.oneCommand = this.oneCommand.bind(this);
  }

  oneCommand() {
    let self = this;
    self.setState({speech: ''})
    artyom.initialize({
                  lang:"en-GB",
                  continuous:false,
                  listen:true,
                  debug:true,
                  speed:1
              }).then(function(){
                  console.log("Ready to work !");
              })

    artyom.on(['*'] , true).then((i, result) => {
                  self.setState({speech: result});
                  // artyom.say("There you go!");
                  artyom.fatality();
              });;
  }

  // componentDidMount() {
    // let self = this;
    //
    // let userDictation = artyom.newDictation({
    //           continuous:false, // Enable continuous if HTTPS connection
    //           onResult:function(text){
    //               // Do something with the text
    //               // console.log(text);
    //               self.setState({speech: text});
    //           },
    //           onStart:function(){
    //               console.log("Dictation started by the user");
    //           },
    //           onEnd:function(){
    //               console.log("Dictation stopped by the user");
    //           }
    //       });
    //
    // userDictation.start();

  // }

  render () {
    return (
      <div>
        <h1>{this.state.speech}</h1>
        <button onClick={this.oneCommand}>Listen</button>
      </div>
    );
  }
}

module.exports = Grid;
