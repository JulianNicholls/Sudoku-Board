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
  }

  return (
    <div className={klass} onClick={clicked} data-index={index}>
      {content}
      {!set && !definite && possibles && (
        <span className="possibles possible-numbers">{possibles}</span>
      )}
      {!set && !definite && candidates && (
        <div className="candidates possible-numbers">{candidates}</div>
      )}
    </div>
  );
};

export default Cell;
