import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cardReducer from './cardReducer';
import gameReducer from './gameReducer';
import playerReducer from './playerReducer';

const globalReducer = combineReducers({
    userReducer: userReducer,
    cardReducer: cardReducer,
    gameReducer: gameReducer,
    playerReducer: playerReducer,
});

export default globalReducer;
