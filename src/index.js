import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-4-theme/dist/bootstrap-theme.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
