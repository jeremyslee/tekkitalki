var React = require('react');
var ReactDOM = require('react-dom');

class Editor extends React.Component{
  constructor (props) {
    super(props);
  }

  render () {
    let html = '';
    this.props.onPageCode.forEach((el) => {
      html += el;
    });
    let lineNumbers = [];
    for (let i = 0; i < this.props.lineCount; i += 1) {
      lineNumbers.push(<li key={i}></li>)
    }
    return (
      <div id="editor" className={this.props.loaded ? "editor loaded" : "editor"}>
        <div className="editor-left-bg"></div>
        <ol>
          {lineNumbers}
        </ol>
        <div className="editor-code">
          {/* <p>{this.props.onPageCode}</p> */}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    );
  }
}

module.exports = Editor;
