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
          {/* <p>{this.props.onPageCode}</p> */}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    );
  }
}

module.exports = Editor;
