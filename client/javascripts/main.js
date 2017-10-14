const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('./components/grid');

const App = () => <Grid baseUrl="http://localhost:3000" />;

ReactDOM.render(<App />, document.getElementById('content'));
