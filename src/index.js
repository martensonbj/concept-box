import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './reset.css';
import './styles.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
