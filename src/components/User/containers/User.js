import React from 'react';
import {UserDisplay} from '../components/UserDisplay';
import { useDispatch, useSelector } from "react-redux";


 export const User=(props)=> {
    let current_user = useSelector(state => state.userReducer.current_user);
    let dataToDisplay='';
    if (props.login !='') {
        dataToDisplay=(
            <UserDisplay>
                connected = "Welcome"+ {props.login}+ "you have" + {props.money}+"$ available"
            </UserDisplay>
        );
    };
        return dataToDisplay
    };

