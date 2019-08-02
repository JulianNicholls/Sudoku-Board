import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { BoardProvider } from './context';

ReactDOM.render(
  <BoardProvider>
    <App />
  </BoardProvider>,
  document.getElementById('root')
);
