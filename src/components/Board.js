import React from 'react';

import Cell from './Cell';

const board = [
  {
    selected: false,
    definite: 1,
  },
  {
    selected: false,
    possibles: '23',
  },
  {
    selected: false,
  },
  {
    selected: true,
    set: 4,
  },
  {
    selected: false,
    possibles: '568923',
  },
  {
    selected: false,
  },
  {
    selected: false,
    set: 7,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
];

const Board = () => {
  const clicked = e => {
    const index = Number(e.target.dataset.index);
    board[index].selected = !board[index].selected;
  };

  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cell key={index} {...cell} index={index} clicked={clicked} />
      ))}
    </div>
  );
};

export default Board;
