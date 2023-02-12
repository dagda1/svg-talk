import { MathJaxProvider } from '@cutting/use-mathjax';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import LogRocket from 'logrocket';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MathJaxProvider>
      <App />
    </MathJaxProvider>
  </React.StrictMode>,
);

LogRocket.init('qkssff/svg-talk');
