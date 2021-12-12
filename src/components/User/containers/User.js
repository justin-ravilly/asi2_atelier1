import React from 'react';
import {UserDisplay} from '../components/UserDisplay';
import { useDispatch, useSelector } from "react-redux";


 export const User=(props)=> {
    let current_user = useSelector(state => state.userReducer.current_user);
    let dataToDisplay='';
    if (current_user.login !='') {
        dataToDisplay=(
            <UserDisplay>
                connected = "Welcome"+ {current_user.login}+ "you have" + {current_user.money}+"$ available"
            </UserDisplay>
        );
    };
        return dataToDisplay
    };

