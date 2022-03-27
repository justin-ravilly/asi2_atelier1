import React, { useState,Component} from 'react';
import { Form, Header,Button,Container } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

export const SignUpForm = (props) =>{

        const navigate = useNavigate();
        
        const [User,setUser]= useState({
            login:"",
            pwd:"",
            lastName:"",
            surName:"",
            account:0,
        });

        function handleChangeUser(event) {
            const target = event.currentTarget;
            const value = target.value;
            const name = target.name;
            setUser({...User, [name]: value.toString()});
                
        };

        function submitOrder(event) {
            
            if ((Object.values(User).includes(""))) {
                console.log("Il manque une valeur!")
            } else {
                console.log(User)
                axios.post('https://asi2-backend-market.herokuapp.com/user', User)
                .then(
                    navigate('/login')
                )}
            return
        }
        
        return (
            <Container>
            <Form>
                <Header as='h4' dividing>
                    User Registration
                </Header>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Surname' placeholder='Surname' name="surName" onChange={handleChangeUser} value={User.surName} />
                    <Form.Input fluid label='Last Name' placeholder='Last Name' name="lastName"  onChange={handleChangeUser} value={User.lastName}/>
                </Form.Group>

                <Form.Field>
                    <Form.Input label="Login" placeholder="Login" onChange={handleChangeUser}  name="login" value={User.login}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input type="password" label="Pwd" placeholder="" onChange={handleChangeUser}  name="pwd" value={User.pwd}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input label="Money" type="number" placeholder="" onChange={handleChangeUser}  name="account" value={User.account}/>
                </Form.Field>
                <Button type='submit' onClick={submitOrder}>Submit</Button>
                <NavLink to="/login">Déja inscrit? Cliquez ici pour vous connecter</NavLink>
            </Form>
            </Container>
        );
        };