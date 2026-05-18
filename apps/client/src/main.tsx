import React from 'react';
import ReactDOM from 'react-dom/client';
import '@nft-frame/ui/theme/tokens.css';
import './wallet';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);
