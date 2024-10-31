// App.js
import React from 'react';
import MinesweeperBoard from './MinesweeperBoard'; // Import the MinesweeperBoard component
import './MinesweeperBoard.css';
// import Cell from './Cell';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Mosweeper</h1>
      <MinesweeperBoard /> {/* Render MinesweeperBoard here */}
    </div>
  );
}

export default App; // Export App as the default export
