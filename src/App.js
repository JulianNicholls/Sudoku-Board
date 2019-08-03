import React from 'react';

import Board from './components/Board';
import Panel from './components/Panel';

import { useBoard } from './context';

function App() {
  const { keyDownHandler } = useBoard();

  return (
    <div className="App" tabIndex="0" onKeyDown={keyDownHandler}>
      <header className="App-header">
        <h1>Judoku</h1>
      </header>
      <main>
        <Board />
        <Panel setMode={true} />
      </main>
    </div>
  );
}

export default App;
