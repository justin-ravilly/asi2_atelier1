import React, {useState} from 'react';
import {Grid, Segment,Menu} from 'semantic-ui-react'
import {User} from './components/User/containers/User'
import {UserForm} from './components/User_form_Signin/UserForm'
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
                                        surname:"John",
                                        lastname:"Doe",
                                        login:"jDoe",
                                        pwd:"jdoepwd",
                                        money:1000,
                                      });

    function handleChange(data){
        setCurrentUser({
        surname:data.surname,
        lastname:data.lastname,
        login:data.login,
        pwd:data.pwd,
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
          <Menu.Item
            name='heropres'
          >
            Hero Presentation
          </Menu.Item>
        <Menu.Item>
          <NavLink to="/signin" >Registration</NavLink>
        </Menu.Item>  
        <Menu.Item>
          <NavLink to="/login" >Login</NavLink>
        </Menu.Item> 
        </Menu>
        <Routes>
        <Route path="/signin" element={<UserForm/>}/>
        <Route path="/login" element={<UserFormLog/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/activity" element={<Activity/>}/>
        </Routes>
        {/*<Grid divided='vertically'>
          <Grid.Row columns={3}>
          <Grid.Column>
            <Segment>
            <UserForm 
                      handleChange={handleChange}
                      submitUserHandler={submitUserHandler}>
            </UserForm>
            </Segment>
          </Grid.Column>
          <Grid.Column>
              <User 
                      surname={currentUser.surname}
                      lastname={currentUser.lastname}
                      login={currentUser.login}
                      pwd={currentUser.pwd}
                      money={currentUser.money}>
              </User>
          </Grid.Column>
          </Grid.Row>
      </Grid>*/}
      </Router>
      </Provider>
    );
}
