var React = require('react');
var ReactDOM = require('react-dom');

class Input extends React.Component{
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div id="input" className={this.props.loaded ? "input loaded" : "input"}>
        <button className={this.props.listening ? "mic-icon mic-listening" : "mic-icon"} onClick={this.props.oneCommand}><img src="https://i.imgur.com/5e5V5Z7.png" /></button>
        <div id="input-display" className={this.props.listenFail ? "input-display loaded" : "input-display"}>
          <span>What we heard: </span>
          {this.props.speech}
        </div>
      </div>
    );
  }
}

module.exports = Input;
