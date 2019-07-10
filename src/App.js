import React from 'react';
import Board from './components/Board';
import Panel from './components/Panel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Judoku</h1>
      </header>
      <main>
        <Board />
        <Panel />
      </main>
    </div>
  );
}

export default App;
