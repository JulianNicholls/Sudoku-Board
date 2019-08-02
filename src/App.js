import React from 'react';
import Board from './components/Board';
import Panel from './components/Panel';
import { BoardProvider } from './context';

function App() {
  const onKey = e => {
    console.log(e.key);
  };

  return (
    <BoardProvider>
      <div className="App" tabIndex="0" onKeyDown={onKey}>
        <header className="App-header">
          <h1>Judoku</h1>
        </header>
        <main>
          <Board />
          <Panel />
        </main>
      </div>
    </BoardProvider>
  );
}

export default App;
