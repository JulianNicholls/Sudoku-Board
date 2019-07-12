import React, { useState, useEffect } from 'react';

export const BoardContext = React.createContext();

export const BoardProvider = ({ children }) => {
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

  const setSelected = (index, addToSelection) => {
    console.log({ index, addToSelection });

    const newBoard = board.slice(0);

    // Clear the current selection unless adding to it.
    // Then set the selected cell
    if (!addToSelection) newBoard.forEach(cell => (cell.selected = false));

    newBoard[index].selected = true;

    setBoard(newBoard);
  };

  const state = {
    board,
    setSelected,
  };

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
};
