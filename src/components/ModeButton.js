import React from 'react';

import { useBoard } from '../context';

const ModeButton = ({ mode, text }) => {
  const { entryMode, setEntryMode } = useBoard();

  let klass = 'function-button mode-button';

  if (entryMode === mode) klass += ' selected';

  return (
    <button className={klass} onClick={() => setEntryMode(mode)}>
      {text}
    </button>
  );
};

export default ModeButton;
