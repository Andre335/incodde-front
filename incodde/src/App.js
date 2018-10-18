import React, { Component } from 'react';
import './App.css';
import CurrencyChart from './components/CurrencyChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CurrencyChart/>
        </header>
    </div>
    );
  }
}

export default App;
