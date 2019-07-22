import React from 'react';

const ModeButton = ({ selected, children, clicked }) => {
  let klass = 'function-button mode-button';

  if (selected) klass += ' selected';

  return (
    <button className={klass} onClick={clicked}>
      {children}
    </button>
  );
};

export default ModeButton;
