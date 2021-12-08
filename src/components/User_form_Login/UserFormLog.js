import React, { useState,Component } from 'react';
import { Form, Header,Button,Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import {updateUser,submitUser} from '../../actions';
import { useNavigate } from "react-router-dom";

export const UserFormLog = (props) =>{
       const [currentUser,setCurrentUser]= useState({
                                            login:"",
                                            pwd:"",
                                        });

        const dispatch = useDispatch();
        const navigate = useNavigate();

        function processInput(event, { valueData }){
            const target = event.currentTarget;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            let currentVal=currentUser;
            setCurrentUser({...currentUser, [name]: value});
            currentVal[name]= value;
            dispatch(updateUser(currentVal));
        };
    
        function submitOrder(data){
            dispatch(submitUser(currentUser));
            navigate('/activity');
        }

    return (
        <Container>
        <Form>
            <Header as='h4' dividing>
                User Log in
            </Header>
            <Form.Field>
                <Form.Input label="Login" placeholder="Login" onChange={processInput}  name="login" value={currentUser.login}/>
            </Form.Field>
            <Form.Field>
                <Form.Input type="password" label="Pwd" placeholder="" onChange={processInput}  name="pwd" value={currentUser.pwd}/>
            </Form.Field>
            <Button type='submit' onClick={submitOrder}>Login</Button>
        </Form>
        </Container>
    );
    }