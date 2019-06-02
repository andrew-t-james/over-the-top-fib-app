import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Fib from './Fib'
import SecondaryPage from './SecondaryPage'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link to="/">Home</Link>
          <Link to="/other-page">Other Page</Link>
        </header>
        <div>
          <Route to="/" component={Fib} />
          <Route to="/other-page" component={SecondaryPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
