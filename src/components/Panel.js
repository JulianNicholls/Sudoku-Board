import React, { useState, useEffect } from 'react';

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

const SetPanel = ({ save }) => {
  const { SET } = useBoard();

  return (
    <div className="panel-set">
      <ModeButton mode={SET} text="Set" />
      <button className="function-button" onClick={save}>
        Save
      </button>
    </div>
  );
};

const Panel = ({ setMode = false }) => {
  const [boardID, setBoardID] = useState('');

  const {
    SET,
    NORMAL,
    POSSIBLES,
    CANDIDATES,
    setEntryMode,
    emptyCell,
    saveBoard,
    checkSolution,
  } = useBoard();

  useEffect(() => {
    if (setMode) setEntryMode(SET);
  }, [SET, setEntryMode, setMode]);

  const save = () => {
    setBoardID(saveBoard(boardID));
  };

  return (
    <div className="panel">
      {setMode && <SetPanel save={save} />}

      <div className="panel-solve">
        {!setMode && (
          <>
            <ModeButton mode={NORMAL} text="Normal" />
            <NumberButton number={1} />
            <NumberButton number={2} />
            <NumberButton number={3} />

            <ModeButton mode={POSSIBLES} text="Corner" />
            <NumberButton number={4} />
            <NumberButton number={5} />
            <NumberButton number={6} />

            <ModeButton mode={CANDIDATES} text="Centre" />
            <NumberButton number={7} />
            <NumberButton number={8} />
            <NumberButton number={9} />
          </>
        )}
        <button className="function-button" onClick={emptyCell}>
          Delete
        </button>
        <button className="function-button double" onClick={checkSolution}>
          Check
        </button>
      </div>
    </div>
  );
};

export default Panel;
