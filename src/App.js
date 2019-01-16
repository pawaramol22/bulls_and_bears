import React, { Component } from 'react';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StockList from './components/StockList';


class App extends Component {
  render() {
    return (
      <div className="ui container">
      	<Header />
		<div className="ui grid">
			<Dashboard />
			<StockList />
		</div>
      </div>
    );
  }
}

export default App;
