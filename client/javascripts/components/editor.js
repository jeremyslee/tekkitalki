var React = require('react');
var ReactDOM = require('react-dom');

class Editor extends React.Component{
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div id="editor" className={this.props.loaded ? "editor loaded" : "editor"}>
        <div className="editor-left-bg"></div>
        <ol>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <div className="editor-code">
          <p>let i = 0;</p>
          <p>console.log('hello');</p>
        </div>
      </div>
    );
  }
}

module.exports = Editor;
