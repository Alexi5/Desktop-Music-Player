import React from 'react';
import ReactDOM from 'react-dom';

import PlayerContainer from './containers/PlayerContainer'

class App extends React.Component {
  render () {
    return (
      <PlayerContainer />
    );
  }
}

// Render to index.html
ReactDOM.render(
  <App />,
  document.getElementById('content')
);