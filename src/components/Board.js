import React from 'react';

import Cell from './Cell';

const board = [
  {
    definite: 1,
  },
  {
    possibles: '23',
  },
  {},
  {
    set: 4,
  },
  {
    possibles: '568923',
  },
  {},
  {
    set: 7,
  },
  {},
  {},
];

const Board = () => {
  return (
    <div class="board">
      {board.map(cell => (
        <Cell {...cell} />
      ))}
    </div>
  );
};

export default Board;
