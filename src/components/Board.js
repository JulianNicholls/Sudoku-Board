import React, { useState, useEffect } from 'react';

import Cell from './Cell';

// const emptyBoard = new Array(81).fill({
//   selected: false,
//   definite: '',
//   possibles: '',
//   candidates: '',
// });

const Board = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const emptyBoard = [];

    for (let i = 0; i < 81; ++i) {
      emptyBoard[i] = {
        selected: false,
        definite: '',
        possibles: '',
        candidates: '',
      };

      setBoard(emptyBoard);
    }
  }, []);

  const clicked = e => {
    const newBoard = board.slice(0);
    const index = Number(e.target.dataset.index);

    // Unless the shift key is pressed, unselect all cells.
    // Then set the clicked cell selected
    if (!e.shiftKey) newBoard.forEach(cell => (cell.selected = false));

    newBoard[index].selected = true;

    setBoard(newBoard);
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
