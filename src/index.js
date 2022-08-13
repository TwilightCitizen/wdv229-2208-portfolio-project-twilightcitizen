/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './client/app/App';

// Constants

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
