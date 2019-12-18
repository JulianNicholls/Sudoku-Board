var express = require('express');
var router = express.Router();

const defaultBoard = [
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '3', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '6', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '8', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '9', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '4', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '1', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '2', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '2', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '6', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '5', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '5', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '7', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '9', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '3', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '1', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '3', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '9', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '6', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '7', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '8', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '1', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '2', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '9', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '3', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '5', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '3', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '8', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '9', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '5', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '6', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '1', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '4', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '3', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: true, set: '2', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
  { selected: false, set: '', definite: '', possibles: [], candidates: [] },
];

module.exports = client => {
  /* GET board. */
  router.get('/:id', (req, res) => {
    console.log('GET', req.params.id);
    res.json(defaultBoard);
  });

  router.post('/', (req, res) => {
    const data = req.body;

    res.json({ id: 'dfd87fd45a4fd6' });
  });

  router.put('/:id', (req, res) => {
    const data = req.body;

    res.json({ updated: 1, ok: true });
  });

  return router;
};
