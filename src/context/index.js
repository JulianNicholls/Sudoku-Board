import React, { useState, useContext } from 'react';
import axios from 'axios';

const goodSolutions = [
  'It looks good to me',
  "That's fine",
  'Well done, it looks right',
];

const badSolutions = [
  'Oops, not quite right',
  "I don't think that's it",
  "I think there's been a slip up",
];

const blockOffsets = [0, 1, 2, 9, 10, 11, 18, 19, 20];
const blockStarts = [0, 3, 6, 27, 30, 33, 54, 57, 60];

const BoardContext = React.createContext();

const NORMAL = 0;
const POSSIBLES = 1;
const CANDIDATES = 2;
const SET = 3;
const MAX_MODE = 3;

const ARROWS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const NUMERALS = '123456789';

const EMPTY_BOARD = new Array(81);

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

  const keyDownHandler = (e) => {
    const { key } = e;
    const selections = getSelections();
    const selection = selections[0]; // Ignore other selections
    const newBoard = board.slice(0);

    if (ARROWS.includes(key)) {
      let delta = 0;

      if (key === 'ArrowUp' && selection >= 9) delta = -9;
      else if (key === 'ArrowDown' && selection <= 71) delta = 9;
      else if (key === 'ArrowRight' && selection % 9 !== 8) delta = 1;
      else if (key === 'ArrowLeft' && selection % 9 !== 0) delta = -1;

      if (delta) {
        newBoard.forEach((cell) => (cell.selected = false));
        newBoard[selection + delta].selected = true;
        setBoard(newBoard);
      }
    } else if (NUMERALS.includes(key)) setNumber(key);
    else if (key === ' ' && entryMode !== SET)
      setEntryMode((entryMode + 1) % MAX_MODE);
  };

  const setSelected = (index, addToSelection) => {
    if (index < 0 || index > 81) console.log('Huh? Index =', index);
    const newBoard = board.slice(0);

    // Clear the current selection unless adding to it.
    // Then toggle the selected cell
    if (!addToSelection) newBoard.forEach((cell) => (cell.selected = false));

    newBoard[index].selected = !newBoard[index].selected;

    // De-select all text
    window.getSelection().removeAllRanges();

    setBoard(newBoard);
  };

  const setNumber = (e) => {
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

  const setInitial = (value) => {
    const selection = getSelections();
    const newBoard = board.slice(0);

    selection.forEach(
      (idx) => (newBoard[idx].set = newBoard[idx].set === value ? '' : value)
    );

    setBoard(newBoard);
  };

  const setDefinite = (value) => {
    const selection = getSelections();
    const newBoard = board.slice(0);

    selection.forEach(
      (idx) =>
        (newBoard[idx].definite = newBoard[idx].definite === value ? '' : value)
    );

    setBoard(newBoard);
  };

  const setPossibles = (value) => {
    const selection = getSelections();
    const newBoard = board.slice(0);

    selection.forEach((index) => {
      const cell = newBoard[index];
      const idx = cell.possibles.indexOf(value);

      if (idx > -1) cell.possibles.splice(idx, 1);
      else cell.possibles.push(value);

      cell.possibles.sort();
    });

    setBoard(newBoard);
  };

  const setCandidates = (value) => {
    const selection = getSelections();
    const newBoard = board.slice(0);

    selection.forEach((index) => {
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

    selection.forEach((index) => {
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

  const saveBoard = async (boardID = '') => {
    try {
      const response = await axios.post(`/boards`, { board });

      console.log(response);
      return response.data.id;
    } catch (err) {
      console.error(`Error saving`, err);
    }
  };

  const loadBoard = async (id) => {
    try {
      const response = await axios.get(`/boards/${id}`);

      if (response.data.length === 81) setBoard(response.data);
      else console.log('Weird!', { data: response.data });
    } catch (err) {
      console.error(`Error loading ${id}:`, err);
    }
  };

  const number = (cell) => (cell.set ? cell.set : cell.definite);

  const checkSolution = () => {
    const solutionIndex = Math.floor(Math.random() * goodSolutions.length);
    let ok = true;
    let rows = [];
    let cols = [];
    let blocks = [];

    for (let row = 0; row < 81; row += 9) {
      const cells = board.slice(row, row + 9).map((cell) => number(cell));

      rows.push(new Set(cells));
    }

    for (let col = 0; col < 9; ++col) {
      let cells = [];
      for (let row = col; row < 81; row += 9) {
        cells.push(number(board[row]));
      }

      cols.push(new Set(cells));

      cells = blockOffsets.reduce((acc, offset) => {
        acc.push(number(board[blockStarts[col] + offset]));

        return acc;
      }, []);

      blocks.push(new Set(cells));
    }

    for (let i = 0; i < 9; ++i) {
      if (rows[i].size !== 9 || rows[i].has('')) {
        console.log(`Row ${i}:`, rows[i], rows[i].size);
        ok = false;
        break;
      }

      if (cols[i].size !== 9 || cols[i].has('')) {
        console.log(`Col ${i}:`, cols[i], cols[i].size);
        ok = false;
        break;
      }

      if (blocks[i].size !== 9 || blocks[i].has('')) {
        console.log(`Col ${i}:`, blocks[i], blocks[i].size);
        ok = false;
        break;
      }
    }

    if (ok) alert(goodSolutions[solutionIndex]);
    else alert(badSolutions[solutionIndex]);
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
    checkSolution,
  };

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
};

export const useBoard = () => {
  const context = useContext(BoardContext);

  if (context === undefined)
    throw new Error('useBoard() must be used within a BoardProvider block');

  return context;
};
