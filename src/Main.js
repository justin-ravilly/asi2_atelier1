import React, {useState} from 'react';
import {Grid, Segment,Menu,Button} from 'semantic-ui-react'
import {User} from './components/User/containers/User'
import globalReducer from './reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter as Router,Routes,Route,NavLink} from "react-router-dom";
import {UserFormLog} from './components/User_form_Login/UserFormLog';
import {Home} from './components/Home/Home';
import {Activity} from './components/Activity/Activity'; 


//create store to exchange data
const store = createStore(globalReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//Create function component
export const Main =(props) =>{
    const [currentUser,setCurrentUser]= useState({
                                        surname:"",
                                        lastname:"",
                                        login:"",
                                        pwd:"",
                                        money:0
                                      });

    function handleChange(data){
        setCurrentUser({
        login:data.login,
        money:data.money
        });
    };

function submitUserHandler(data){
    console.log("user to submit"+data);
};
                                  
    return (
        <Provider store={store} >
        <Router>
        <Menu> 
        <Menu.Item>
          <NavLink to="/login" >Login</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/buyCard" >Buy</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/sellCard" >Sell</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/activity" >Play</NavLink>
        </Menu.Item>
        <Menu.Item name='userNameDisplay'>
          <User>
            handleChange={handleChange}
            login={currentUser.login}
            money={currentUser.money}
          </User>
        </Menu.Item>  
        </Menu>
        <Routes>
        <Route path="/login" element={<UserFormLog/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/buyCard" element={<Activity/>}/>
        <Route path="/sellCard" element={<Activity/>}/>
        <Route path="/activity" element={<Activity/>}/>
        </Routes>
      </Router>
      </Provider>
    );
}