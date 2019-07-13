import React, { useState, useContext } from 'react';

import { BoardContext } from '../context';

import ModeButton from './ModeButton';

const SET = 0;
const POSSIBLES = 1;
const CANDIDATES = 2;

const Panel = () => {
  const { setDefinite, setPossibles, setCandidates } = useContext(BoardContext);
  const [mode, setMode] = useState(SET);

  const setNumber = e => {
    const value = e.target.innerText;

    switch (mode) {
      case SET:
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

  const numberClass = mode === SET ? 'definite-button' : 'possibles-button';

  return (
    <div className="panel">
      <ModeButton selected={mode === SET} clicked={() => setMode(SET)}>
        Set
      </ModeButton>
      <button className={numberClass} onClick={setNumber}>
        1
      </button>
      <button className={numberClass} onClick={setNumber}>
        2
      </button>
      <button className={numberClass} onClick={setNumber}>
        3
      </button>
      <ModeButton
        selected={mode === POSSIBLES}
        clicked={() => setMode(POSSIBLES)}
      >
        Corner
      </ModeButton>
      <button className={numberClass} onClick={setNumber}>
        4
      </button>
      <button className={numberClass} onClick={setNumber}>
        5
      </button>
      <button className={numberClass} onClick={setNumber}>
        6
      </button>
      <ModeButton
        selected={mode === CANDIDATES}
        clicked={() => setMode(CANDIDATES)}
      >
        Middle
      </ModeButton>
      <button className={numberClass} onClick={setNumber}>
        7
      </button>
      <button className={numberClass} onClick={setNumber}>
        8
      </button>
      <button className={numberClass} onClick={setNumber}>
        9
      </button>
    </div>
  );
};

export default Panel;
