import React, { useState, useEffect, useContext } from 'react';

const BoardContext = React.createContext();

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const emptyBoard = [];

    for (let i = 0; i < 81; ++i) {
      emptyBoard[i] = {
        selected: false,
        definite: '',
        possibles: [],
        candidates: [],
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

    if (selection.length === 0) return;

    const newBoard = board.slice(0);

    selection.forEach(idx => (newBoard[idx].definite = value));

    setBoard(newBoard);
  };

  const setPossibles = value => {
    const selection = getSelection();

    if (selection.length === 0) return;

    const newBoard = board.slice(0);

    selection.forEach(index => {
      const cell = newBoard[index];
      const idx = cell.possibles.indexOf(value);

      if (idx > -1) cell.possibles.splice(idx, 1);
      else cell.possibles.push(value);

      cell.possibles.sort();
    });

    setBoard(newBoard);
  };

  const setCandidates = value => {
    const selection = getSelection();

    if (selection.length === 0) return;

    const newBoard = board.slice(0);

    selection.forEach(index => {
      const cell = newBoard[index];
      const idx = cell.candidates.indexOf(value);

      if (idx > -1) cell.candidates.splice(idx, 1);
      else cell.candidates.push(value);

      cell.candidates.sort();
    });

    setBoard(newBoard);
  };

  const emptyCell = () => {
    const selection = getSelection();

    if (selection.length === 0) return;

    const newBoard = board.slice(0);

    selection.forEach(index => {
      newBoard[index] = {
        ...newBoard[index],
        definite: '',
        possibles: [],
        candidates: [],
      };
    });

    setBoard(newBoard);
  };

  const state = {
    board,
    setSelected,
    setDefinite,
    setPossibles,
    setCandidates,
    emptyCell,
  };

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
};

export const useBoard = () => {
  const context = useContext(BoardContext);

  if (context === undefined)
    throw new Error('useBoard() must be used within a BoardProvider');

  return context;
};
