import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from './Scenes/Home/Home.js';
import Game from './Scenes/Game/Game.js';

const AppRouter = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/game">Start The Game!</Link>
        </li>
      </ul>
      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/game" component={Game} />
    </div>
  </Router>
);
export {AppRouter}
