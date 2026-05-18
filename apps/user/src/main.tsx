import React from 'react';
import ReactDOM from 'react-dom/client';
import '@nft-frame/ui/theme/tokens.css';
import './wallet';
import { App } from './App';

const params = new URLSearchParams(window.location.search);
const displayId = params.get('displayId');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App initialDisplayId={displayId} /></React.StrictMode>
);
