import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <AppContainer>
    {routes()}
  </AppContainer>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
