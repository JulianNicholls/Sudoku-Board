import React, { useState, useContext } from 'react';
import axios from 'axios';

const BoardContext = React.createContext();

const NORMAL = 0;
const POSSIBLES = 1;
const CANDIDATES = 2;
const SET = 3;
const MAX_MODE = 3;

const ARROWS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const NUMERALS = '123456789';

const EMPTY_BOARD = [];

for (let i = 0; i < 81; ++i) {
  EMPTY_BOARD[i] = {
    selected: false,
    set: '',
    definite: '',
    possibles: [],
    candidates: [],
  };
}

EMPTY_BOARD[0].selected = true;

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [entryMode, setEntryMode] = useState(NORMAL);

  const keyDownHandler = e => {
    const selections = getSelections();
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
    else if (key === ' ' && entryMode !== SET)
      setEntryMode((entryMode + 1) % MAX_MODE);
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
    const newBoard = board.slice(0);

    selection.forEach(
      idx => (newBoard[idx].set = newBoard[idx].set === value ? '' : value)
    );

    setBoard(newBoard);
  };

  const setDefinite = value => {
    const selection = getSelections();
    const newBoard = board.slice(0);

    selection.forEach(
      idx =>
        (newBoard[idx].definite = newBoard[idx].definite === value ? '' : value)
    );

    setBoard(newBoard);
  };

  const setPossibles = value => {
    const selection = getSelections();
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

  const saveBoard = (boardID = '') => {
    let id = boardID;

    if (!id) id = Date.now().toString(16);

    console.log(`Saving ${id}`);
    localStorage.setItem(`judoku-${id}`, JSON.stringify(board));

    return id;
  };

  const loadBoard = async id => {
    try {
      const response = await axios.get(`/boards/${id}`);

      if (response.data.length === 81) {
        console.log(`Loaded ${id} OK`);
        setBoard(response.data);
      } else {
        console.log({ data: response.data });
      }
    } catch (err) {
      console.error(`Error loading ${id}:`, err);
    }
  };

  const getSelections = () => {
    const selections = board.reduce((indexes, cell, idx) => {
      if (cell.selected) indexes.push(idx);

      return indexes;
    }, []);

    if (selections.length === 0) console.error('No selected cell');

    return selections;
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
    saveBoard,
    loadBoard,
  };

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
};

export const useBoard = () => {
  const context = useContext(BoardContext);

  if (context === undefined)
    throw new Error('useBoard() must be used within a BoardProvider block');

  return context;
};
