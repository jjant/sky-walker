import React, { Component } from 'react';
import './App.css';
import Search from './search/Search';
import Header from './layout/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Search />
      </div>
    );
  }
}

export default App;
