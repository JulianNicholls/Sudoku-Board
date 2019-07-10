import React from 'react';

const Cell = ({
  index,
  clicked,
  set,
  definite,
  selected,
  possibles,
  bg,
  candidates,
}) => {
  let klass = selected ? 'cell selected ' : 'cell ';
  let content = '';

  if (set) {
    klass += 'set-cell';
    content = set;
  } else if (definite) {
    klass += 'definite-cell';
    content = definite;
  } else if (possibles) {
    klass += 'possibles-cell';
    content = possibles;
  }

  return (
    <div className={klass} onClick={clicked} data-index={index}>
      {content}
    </div>
  );
};

export default Cell;
