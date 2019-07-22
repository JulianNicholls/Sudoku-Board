import React, { useState } from 'react';

import { useBoard } from '../context';

import ModeButton from './ModeButton';

const NORMAL = 0;
const POSSIBLES = 1;
const CANDIDATES = 2;

const Panel = () => {
  const { setDefinite, setPossibles, setCandidates, emptyCell } = useBoard();
  const [mode, setMode] = useState(NORMAL);

  const setNumber = e => {
    const value = e.target.innerText;

    switch (mode) {
      case NORMAL:
        setDefinite(value);
        break;

      case POSSIBLES:
        setPossibles(value);
        break;

      case CANDIDATES:
        setCandidates(value);
        break;

      default:
        console.error('Huh?!');
    }
  };

  const klass = mode === NORMAL ? 'definite-button' : 'possibles-button';

  return (
    <div className="panel">
      <ModeButton selected={mode === NORMAL} clicked={() => setMode(NORMAL)}>
        Normal
      </ModeButton>
      <button className={klass} onClick={setNumber}>
        1
      </button>
      <button className={klass} onClick={setNumber}>
        2
      </button>
      <button className={klass} onClick={setNumber}>
        3
      </button>

      <ModeButton
        selected={mode === POSSIBLES}
        clicked={() => setMode(POSSIBLES)}
      >
        Corner
      </ModeButton>
      <button className={klass} onClick={setNumber}>
        4
      </button>
      <button className={klass} onClick={setNumber}>
        5
      </button>
      <button className={klass} onClick={setNumber}>
        6
      </button>

      <ModeButton
        selected={mode === CANDIDATES}
        clicked={() => setMode(CANDIDATES)}
      >
        Centre
      </ModeButton>
      <button className={klass} onClick={setNumber}>
        7
      </button>
      <button className={klass} onClick={setNumber}>
        8
      </button>
      <button className={klass} onClick={setNumber}>
        9
      </button>

      <button className="function-button" onClick={emptyCell}>
        Delete
      </button>
    </div>
  );
};

export default Panel;
