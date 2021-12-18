import { combineReducers } from 'redux';
import userReducer from './userReducer';
import robotReducer from './robotReducer';
import partReducer from './partReducer';

const globalReducer = combineReducers({
    userReducer: userReducer,
    robotReducer: robotReducer,
    partReducer: partReducer
});

export default globalReducer;
