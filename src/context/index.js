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
    const newBoard = board.slice(0);

    // Clear the current selection unless adding to it.
    // Then set the selected cell
    if (!addToSelection) newBoard.forEach(cell => (cell.selected = false));

    newBoard[index].selected = !newBoard[index].selected;

    setBoard(newBoard);
  };

  const getSelection = () => {
    return board.reduce((indexes, cell, idx) => {
      if (cell.selected) indexes.push(idx);

      return indexes;
    }, []);
  };

  const setDefinite = value => {
    const selection = getSelection();
    const newBoard = board.slice(0);

    selection.forEach(idx => (newBoard[idx].definite = value));

    setBoard(newBoard);
  };

  const setPossibles = value => {
    value = String(value);

    const selection = getSelection();
    const newBoard = board.slice(0);

    // selection.forEach(index => {
    //   if(newBoard[index].possibles.include)
    // });

    setBoard(newBoard);
  };

  const setCandidates = value => {
    value = String(value);

    const selection = getSelection();
    const newBoard = board.slice(0);

    // selection.forEach(index => {
    //   if(newBoard[index].possibles.include)
    // });

    setBoard(newBoard);
  };

  const state = {
    board,
    setSelected,
    setDefinite,
    setPossibles,
    setCandidates,
  };

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
};
