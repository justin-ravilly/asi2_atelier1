import React, { useState,Component } from 'react';
import { Form, Header,Button,Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import {updateUser,submitUser} from '../../actions';
import { useNavigate } from "react-router-dom";

export const UserFormLog = (props) =>{
       const [currentUser,setCurrentUser]= useState({
                                                        surname:"",
                                                        lastname:"",
                                                        login:"",
                                                        pwd:"",
                                                        money:0});

        const dispatch = useDispatch();
        const navigate = useNavigate();
        
        function processInput(event, { valueData }){
            const target = event.currentTarget;
            const value = target.value;
            const name = target.name;
            let currentVal=currentUser;
            setCurrentUser({...currentUser, [name]: value});
            currentVal[name]= value;
            dispatch(updateUser(currentVal));
        };
    
        function submitOrder(data){
            dispatch(submitUser(currentUser));
            navigate('/activity');
        };

        function connectToServer() {
            fetch('https://asi2-backend-market.herokuapp.com/auth?login='+currentUser.login+'&pwd='+currentUser.pwd,{
                method: 'POST',
                headers: {
                    "key": "Content-Type",
                    "name": "Content-Type",
                    "value": "application/json",
                    "type": "text"
                }
            })
            .then(response => response.json())
            .then(data => {if(data==-1) {
                console.log("Echec de connexion")
            } else {
                console.log("Connexion réussie")
                fetch('https://asi2-backend-market.herokuapp.com/user/'+data)
                .then(response => response.json())
                .then(data => {
                    let currentVal=currentUser;
                    console.log(currentVal);
                    dispatch(updateUser(currentVal));
                })
                .then(navigate("/"));
            }});
        };  

    return (
        <Container>
        <Form>
            <Header as='h4' dividing>
                User Log in
            </Header>
            <Form.Field>
                <Form.Input label="Login" placeholder="Login" name="login" onChange={processInput} value={currentUser.login}/>
            </Form.Field>
            <Form.Field>
                <Form.Input type="password" label="Pwd" placeholder=""  name="pwd" onChange={processInput} value={currentUser.pwd}/>
            </Form.Field>
            <Button type='submit' onClick={connectToServer}>Connect to the server</Button>
        </Form>
        </Container>
    )}