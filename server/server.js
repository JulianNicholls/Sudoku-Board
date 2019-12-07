const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const apiRouter = require('./routes');

const MONGODB_URI = 'mongodb://judoku:Judoku2019@ds113435.mlab.com:13435/judoku';

const port = process.env.PORT || 3001;

const publicPath = path.join(__dirname, '..', 'public');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use('/boards', apiRouter);

MongoClient.connect(MONGODB_URI, {
  useNewUrlParser: true,
  poolSize: 10,
  wtimeout: 2500,
})
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    app.listen(port, 'Judoku server listening on port', port);
  });
