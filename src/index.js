import '../styles/main.css';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

const containerId = 'root';

const container = document.getElementById(containerId);
if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} else {
  const div = document.createElement('div');
  const text = document.createTextNode(
    `Element wiht id '${containerId}' not found at 'index.js'.`
  );
  div.appendChild(text);
  document.body.appendChild(div);
}

if (module.hot) {
  module.hot.accept();
}

// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line no-console
//   reportWebVitals(console.log);
// }
