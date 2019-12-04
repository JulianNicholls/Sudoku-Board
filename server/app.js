const express = require('express');
const path = require('path');
const logger = require('morgan');

const apiRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/boards', apiRouter);

module.exports = app;
