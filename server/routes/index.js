const express = require('express');
const { ObjectId } = require('bson');

const router = express.Router();

let boards;

const connect = async (client) => {
  try {
    const judoku = await client.db('judoku');
    boards = await judoku.collection('boards');
    console.log('Connected to boards collection');
  } catch (err) {
    console.error('Cannot connect to db:', err);
  }
};

module.exports = (client) => {
  connect(client);

  // GET board.
  router.get('/:id', async (req, res) => {
    try {
      const cursor = boards.find({ _id: ObjectId(req.params.id) });
      const board = await cursor.toArray();
      // console.log(board[0]._id);
      res.json(board[0].cells);
    } catch (err) {
      console.error('Cannot load board', err);
      res.json({ ok: false });
    }
  });

  // Create board
  router.post('/', async (req, res) => {
    const { board } = req.body;

    try {
      const response = await boards.insertOne({ cells: board });

      res.status(201).json({ id: response.insertedId });
    } catch (err) {
      console.error('Cannot add board', err);
      res.status(422).json({ ok: false });
    }
  });

  router.put('/:id', (req, res) => {
    // const { board } = req.body;

    res.json({ updated: 1, ok: true });
  });

  return router;
};
