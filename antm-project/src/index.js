import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import App from './js/page/App';
import 'antd-mobile/dist/antd-mobile.css'
import registerServiceWorker from './registerServiceWorker';

import { Button } from 'antd-mobile'

import 'less/reset.less'
import 'less/global.less'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <Button type="primary"> 按钮 </Button>
          <Button type="warning"> 按钮 </Button>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="test ellipsis red">
        测试测试省略号，测试测试省略号，测试测试省略号，
        测试测试省略号，测试测试省略号，测试测试省略号，
        测试测试省略号，测试测试省略号，测试测试省略号
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
