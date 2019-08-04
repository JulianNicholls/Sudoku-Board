import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Board from './components/Board';
import Panel from './components/Panel';

import { useBoard } from './context';

const SetPage = () => {
  return (
    <>
      <Board />
      <Panel setMode={true} />
    </>
  );
};

const SolvePage = ({ match }) => {
  const { loadBoard } = useBoard();

  useEffect(() => {
    console.log({ match, params: match.params, id: match.params.id });
  }, [match]);

  return (
    <>
      <Board />
      <Panel />
    </>
  );
};

function App() {
  const { keyDownHandler } = useBoard();

  return (
    <div className="App" tabIndex="0" onKeyDown={keyDownHandler}>
      <header className="App-header">
        <h1>Judoku</h1>
      </header>
      <Router>
        <main>
          <Route path="/" exact component={SetPage} />
          <Route path="/board/:id" component={SolvePage} />
        </main>
      </Router>
    </div>
  );
}

export default App;
