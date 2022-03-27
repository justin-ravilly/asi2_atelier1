import React, {useEffect, useState} from 'react';
import MainRouter from './components/Router.js'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import globalReducer from './reducers';
import axios from 'axios';

export const Main =() =>{
  const store = createStore(globalReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  useEffect(()=> {
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
  },[])
                                
  return (
    <Provider store={store}>
    <MainRouter></MainRouter>
    </Provider>
  );
}

export default Main;