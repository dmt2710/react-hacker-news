import * as React from 'react';
import './AppContainer.css';

const logo = require('./logo.svg');

class AppContainer extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <label className="header-title">Welcome to Hacker News (dmt2710's version)</label>
        </div>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppContainer;
