import React from 'react';

const Cell = ({ set, definite, selected, possibles, bg, candidates }) => {
  if (set) return <div class="cell set-cell">{set}</div>;
  else if (definite) return <div class="cell definite-cell">{definite}</div>;
  else if (possibles) return <div class="cell possibles-cell">{possibles}</div>;
  else return <div class="cell" />;
};

export default Cell;
