import {React,useState} from 'react';
import { Form, Header,Button,Container } from 'semantic-ui-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {updateUser} from '../../actions';
import { useNavigate } from 'react-router';
  

export const SignInForm = (props) =>{

    const [currentUser,setCurrentUser]= useState({
        login:"",
        pwd:"",
    });

    const [isLoading,setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChangeUser(event) {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;
        setCurrentUser({...currentUser, [name]: value.toString()});
    };
    
    function submitOrder() {
        setIsLoading(true);
        axios.post('https://asi2-backend-market.herokuapp.com/auth?login='+currentUser.login+'&pwd='+currentUser.pwd)
        .then(res => {
            console.log(res.data);
            if (res.data != -1) {
                axios.get('https://asi2-backend-market.herokuapp.com/user/'+res.data)
                .then(res => {
                    setIsLoading(false);
                    dispatch(updateUser(res.data))
                    navigate("/")
                    window.alert("Connexion réussie");
                });
            } else {
                window.alert("Echec de connexion");
                setIsLoading(false);
            }
        })
    };

    if (isLoading) {
        return (
            <div className="App">Loading...</div>
        );
    };

    return (
        <Container>
        <Form>
            <Header as='h4' dividing>
                User Log in
            </Header>
            <Form.Field>
                <Form.Input label="Login" placeholder="Login" onChange={handleChangeUser}  name="login" value={currentUser.login}/>
            </Form.Field>
            <Form.Field>
                <Form.Input type="password" label="Pwd" placeholder="" onChange={handleChangeUser}  name="pwd" value={currentUser.pwd}/>
            </Form.Field>
            <Button type='submit' onClick={submitOrder}>Login</Button>
        </Form>
        </Container>
    )
}