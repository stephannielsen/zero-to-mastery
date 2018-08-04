import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { requestPlanets } from './reducers';


const logger = createLogger();

const rootReducer = combineReducers({ requestPlanets });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(<Provider store={store}>

          <div id="particles-js" >
    <App /></div>
</Provider>, document.getElementById('root'));
registerServiceWorker();