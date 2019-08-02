import React from 'react';

import { useBoard } from '../context';

import ModeButton from './ModeButton';

const NumberButton = ({ number }) => {
  const { entryMode, NORMAL, setNumber } = useBoard();

  const klass = entryMode <= NORMAL ? 'definite-button' : 'possibles-button';

  return (
    <button className={klass} onClick={setNumber}>
      {number}
    </button>
  );
};

const Panel = () => {
  const { SET, NORMAL, POSSIBLES, CANDIDATES, emptyCell } = useBoard();

  return (
    <div className="panel">
      <div className="panel1">
        <ModeButton mode={NORMAL} text={'Normal'} />
        <NumberButton number={1} />
        <NumberButton number={2} />
        <NumberButton number={3} />

        <ModeButton mode={POSSIBLES} text={'Corner'} />
        <NumberButton number={4} />
        <NumberButton number={5} />
        <NumberButton number={6} />

        <ModeButton mode={CANDIDATES} text={'Centre'} />
        <NumberButton number={7} />
        <NumberButton number={8} />
        <NumberButton number={9} />
      </div>

      <div className="panel2">
        <ModeButton mode={SET} text={'Set'} />
        <button className="function-button" onClick={emptyCell}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Panel;
