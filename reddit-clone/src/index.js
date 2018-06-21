import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
// Importing css
import './App.css';

import Routes from './routes';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
    <Routes history={browserHistory} />, document.getElementById('root'));

registerServiceWorker();
