import React, { useState, useEffect, useContext } from 'react';

const BoardContext = React.createContext();

const SET = 0;
const NORMAL = 1;
const POSSIBLES = 2;
const CANDIDATES = 3;
const MAX_MODE = 4;

const ARROWS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const NUMERALS = '123456789';

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState([]);
  const [entryMode, setEntryMode] = useState(NORMAL);

  useEffect(() => {
    const emptyBoard = [];

    for (let i = 0; i < 81; ++i) {
      emptyBoard[i] = {
        selected: false,
        set: '',
        definite: '',
        possibles: [],
        candidates: [],
      };
    }

    emptyBoard[0].selected = true;

    setBoard(emptyBoard);
  }, []);

  const keyDownHandler = e => {
    const selections = getSelections();

    if (selections.length === 0) return;

    const selection = selections[0]; // Ignore other selections
    const newBoard = board.slice(0);
    const key = e.key;

    if (ARROWS.includes(key)) {
      let delta = 0;

      if (key === 'ArrowUp' && selection >= 9) delta = -9;
      else if (key === 'ArrowDown' && selection <= 71) delta = 9;
      else if (key === 'ArrowRight' && selection % 9 !== 8) delta = 1;
      else if (key === 'ArrowLeft' && selection % 9 !== 0) delta = -1;

      if (delta) {
        newBoard.forEach(cell => (cell.selected = false));
        newBoard[selection + delta].selected = true;
        setBoard(newBoard);
      }
    } else if (NUMERALS.includes(key)) setNumber(key);
    else if (key === ' ') setEntryMode((entryMode + 1) % MAX_MODE);
  };

  const setSelected = (index, addToSelection) => {
    const newBoard = board.slice(0);

    // Clear the current selection unless adding to it.
    // Then toggle the selected cell
    if (!addToSelection) newBoard.forEach(cell => (cell.selected = false));

    newBoard[index].selected = !newBoard[index].selected;

    // De-select all text
    window.getSelection().removeAllRanges();

    setBoard(newBoard);
  };

  const setNumber = e => {
    const value = e.target ? e.target.innerText : e;

    switch (entryMode) {
      case SET:
        setInitial(value);
        break;

      case NORMAL:
        setDefinite(value);
        break;

      case POSSIBLES:
        setPossibles(value);
        break;

      case CANDIDATES:
        setCandidates(value);
        break;

      default:
        console.error('Huh?!');
    }
  };

  const setInitial = value => {
    const selection = getSelections();

    if (selection.length === 0) return;

    const newBoard = board.slice(0);

    selection.forEach(
      idx => (newBoard[idx].set = newBoard[idx].set === value ? '' : value)
    );

    setBoard(newBoard);
  };

  const setDefinite = value => {
    const selection = getSelections();

    if (selection.length === 0) return;

    const newBoard = board.slice(0);

    selection.forEach(
      idx =>
        (newBoard[idx].definite = newBoard[idx].definite === value ? '' : value)
    );

    setBoard(newBoard);
  };

  const setPossibles = value => {
    const selection = getSelections();

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
    const selection = getSelections();

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
    const selection = getSelections();

    if (selection.length === 0) return;

    const newBoard = board.slice(0);

    selection.forEach(index => {
      newBoard[index] = {
        ...newBoard[index],
        set: '',
        definite: '',
        possibles: [],
        candidates: [],
      };
    });

    setBoard(newBoard);
  };

  const getSelections = () => {
    return board.reduce((indexes, cell, idx) => {
      if (cell.selected) indexes.push(idx);

      return indexes;
    }, []);
  };

  const state = {
    SET,
    NORMAL,
    POSSIBLES,
    CANDIDATES,
    keyDownHandler,
    board,
    setNumber,
    entryMode,
    setEntryMode,
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
    throw new Error('useBoard() must be used within a BoardProvider block');

  return context;
};
