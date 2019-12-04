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

/* GET board. */
router.get('/:id', (_req, res) => {
  res.json(defaultBoard);
});

router.post('/', (req, res) => {
  const data = req.body;

  res.json({ id: 'af78d7f8da9f797a0fdfd87fd45a4fd6' });
});

router.put('/:id', (req, res) => {
  const data = req.body;

  res.json({ ok: true });
});

module.exports = router;
