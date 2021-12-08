// import react tools
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import the created Main component
import {Main} from './Main';
//add Semantic UI import
import 'semantic-ui-css/semantic.min.css';

//Insert a <Main> component inside the <div id='root'/>
// send the property title to the App component
ReactDOM.render(<Main />, document.getElementById('root')
);