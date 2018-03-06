import React from 'react';

const Home = () => (
  <div>
    <h2>Home</h2>
    <h4>Welcome to my exploration of ReactJS</h4>
    <p>This app This constitutes the basic tutorial from reactjs.orc website but goes further to implement the additional features stated below</p>

    <ul>
      <li>Display the location for each move in the format (col, row) in the move history list.</li>
      <li>Bold the currently selected item in the move list.</li>
      <li>Rewrite Board to use two loops to make the squares instead of hardcoding them.</li>
      <li>Add a toggle button that lets you sort the moves in either ascending or descending order.</li>
      <li>When someone wins, highlight the three squares that caused the win.</li>
      <li>When no one wins, display a message about the result being a draw.</li>
      <li>Reset the Game</li>
      <li>Organize Directory into Scenes/Pages, Services and Components</li>
      <li>Implement routing to load specific page components</li>
    </ul>
  </div>
);

export {Home};
