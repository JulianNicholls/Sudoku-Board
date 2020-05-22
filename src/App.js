import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
} from 'react-router-dom';

import Board from './components/Board';
import Panel from './components/Panel';

import { useBoard } from './context';

const SetPage = () => (
  <>
    <Board />
    <Panel setMode={true} />
  </>
);

const SolvePage = () => {
  const { id } = useParams();

  return (
    <>
      <Board id={id} />
      <Panel />
    </>
  );
};

const NotFound = () => {
  const params = useParams();

  if (params[0].length === 25)
    return <Redirect to={{ pathname: `/board/${params[0].slice(1)}` }} />;

  console.log({ params, p0: params[0] });

  return <h2>Not Found</h2>;
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
          <Switch>
            <Route exact path="/">
              <SetPage />
            </Route>

            <Route path="/board/:id">
              <SolvePage />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
