import React, { useContext } from 'react';

import Cell from './Cell';
import { BoardContext } from '../context';

const Board = () => {
  const { board, setSelected } = useContext(BoardContext);

  const clicked = e => {
    setSelected(e.target.dataset.index, e.shiftKey);
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
