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
  border,
}) => {
  let klass = `cell border-${border} `;
  let content = '';

  if (selected) klass += 'selected-cell ';

  if (set) {
    klass += 'set-cell';
    content = set;
  } else if (definite) {
    klass += 'definite-cell';
    content = definite;
  } else if (candidates.length > 0) {
    klass += 'candidates-cell';
    content = candidates.join('');
  } else if (possibles.length > 0) {
    klass += 'possibles-cell';
    content = possibles.join('');
  }

  return (
    <div className={klass} onClick={clicked} data-index={index}>
      {content}
    </div>
  );
};

export default Cell;
