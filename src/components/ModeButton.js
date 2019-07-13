import React from 'react';

const ModeButton = ({ selected, children, clicked }) => {
  const klass = selected ? 'mode-button selected' : 'mode-button';

  return (
    <button className={klass} onClick={clicked}>
      {children}
    </button>
  );
};

export default ModeButton;
