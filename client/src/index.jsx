import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppContainer } from './containers/AppContainer';

function App () {
  return (
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  )
}
ReactDOM.render(<App />, document.getElementById('app'),);
