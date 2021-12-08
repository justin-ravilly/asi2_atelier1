import React from 'react';
import {UserDisplay} from '../components/UserDisplay';
import { useDispatch, useSelector } from "react-redux";


 export const User=(props)=> {
    let current_user = useSelector(state => state.userReducer.user);
        return ( 
                <UserDisplay 
                    surname={current_user.surname}
                    lastname={current_user.lastname}
                    login={current_user.login}
                    pwd={current_user.pwd}
                    money={current_user.money}>
                </UserDisplay>
            );
    }
