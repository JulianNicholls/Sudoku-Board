import React, { useEffect, useState } from 'react';

import Cell from './Cell';
import { useBoard } from '../context';

const CORNERS = [
  '14', // Line 1
  '1',
  '1',
  '14',
  '1',
  '1',
  '14',
  '1',
  '12',
  '4', // Line 2
  '0',
  '0',
  '4',
  '0',
  '0',
  '4',
  '0',
  '2',
  '34', // Line 3
  '3',
  '3',
  '34',
  '3',
  '3',
  '34',
  '3',
  '23',
  '4', // Line 4
  '0',
  '0',
  '4',
  '0',
  '0',
  '4',
  '0',
  '2',
  '4', // Line 5
  '0',
  '0',
  '4',
  '0',
  '0',
  '4',
  '0',
  '2',
  '34', // Line 6
  '3',
  '3',
  '34',
  '3',
  '3',
  '34',
  '3',
  '23',
  '4', // Line 7
  '0',
  '0',
  '4',
  '0',
  '0',
  '4',
  '0',
  '2',
  '4', // Line 8
  '0',
  '0',
  '4',
  '0',
  '0',
  '4',
  '0',
  '2',
  '34', // Line 9
  '3',
  '3',
  '34',
  '3',
  '3',
  '34',
  '3',
  '23',
];

const Board = ({ id = null }) => {
  const { board, setSelected, loadBoard } = useBoard();
  const [loaded, setLoaded] = useState(false);

  const clicked = e => {
    setSelected(e.target.dataset.index, e.shiftKey);
  };

  useEffect(() => {
    if (id && !loaded) loadBoard(id);

    setLoaded(true);
  }, [id, loadBoard, loaded]);

  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cell
          key={index}
          {...cell}
          index={index}
          clicked={clicked}
          border={CORNERS[index]}
        />
      ))}
    </div>
  );
};

export default Board;
