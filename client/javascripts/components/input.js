var React = require('react');
var ReactDOM = require('react-dom');

class Input extends React.Component{
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div id="input" className={this.props.loaded ? "input loaded" : "input"}>
        <div id="input-display">{this.props.speech}</div>
        <button className={this.props.listening ? "mic-icon mic-listening" : "mic-icon"} onClick={this.props.oneCommand}><img src="https://i.imgur.com/5e5V5Z7.png" /></button>
      </div>
    );
  }
}

module.exports = Input;
