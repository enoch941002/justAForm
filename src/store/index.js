import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import tableReducer from '../reducer/tableinfo';

const store = createStore(
    tableReducer,applyMiddleware(logger)
    );

export default store;