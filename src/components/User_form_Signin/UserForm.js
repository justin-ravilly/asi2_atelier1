import React, { useState,Component} from 'react';
import { Form, Header,Button,Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import {updateUser,submitUser} from '../../actions';
import { render } from '@testing-library/react';

export const UserForm = (props) =>{
        const [currentUser,setCurrentUser]= useState({
                                            surname:"",
                                            lastname:"",
                                            login:"",
                                            pwd:"",
                                            money:0,
                                        });

        const dispatch = useDispatch();
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
        };
                                 
        return (
            <Container>
            <Form>
                <Header as='h4' dividing>
                    User Registration
                </Header>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Surname' placeholder='Surname' name="surname" onChange={processInput} value={currentUser.surname} />
                    <Form.Input fluid label='Last Name' placeholder='Last Name' name="lastname"  onChange={processInput} value={currentUser.lastname}/>
                </Form.Group>

                <Form.Field>
                    <Form.Input label="Login" placeholder="Login" onChange={processInput}  name="login" value={currentUser.login}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input type="password" label="Pwd" placeholder="" onChange={processInput}  name="pwd" value={currentUser.pwd}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input label="Money" type="number" placeholder="" onChange={processInput}  name="money" value={currentUser.money}/>
                </Form.Field>
                <Button type='submit' onClick={submitOrder}>Submit</Button>
            </Form>
            </Container>
        );
        };
