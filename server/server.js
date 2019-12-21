const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://judoku:m316cw@mflix-rwv9j.mongodb.net';

const port = process.env.PORT || 3001;

const publicPath = path.join(__dirname, '..', 'public');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

MongoClient.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  wtimeout: 2500,
})
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    const apiRouter = require('./routes')(client);

    app.use('/boards', apiRouter);

    app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });

    app.listen(port, () => {
      console.log('Judoku server listening on port', port);
    });
  });
