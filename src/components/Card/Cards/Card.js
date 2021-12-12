import React, { useState } from 'react';
import {Label} from './containers/Label';

import {setSelectedRobot} from '../../../actions';
import { useDispatch } from 'react-redux';

export const Robot =(props) =>{
    // Connect to the store
    const dispatch = useDispatch();

    function handleOnRobotSelected(robot_obj){
        dispatch(setSelectedRobot(robot_obj));   
    }
    return (
        <div className="panel panel-default" onClick={() => handleOnRobotSelected(props.robot)}>
            
            <div className="panel-body">
                <Label 
                    title={props.robot.title} 
                    attack={props.robot.attack}
                    description={props.robot.description}
                    famille={props.robot.famille}
                    life={props.robot.life}
                    energy={props.robot.energy}
                    defense={props.robot.defense}
                    price={props.robot.price}

                />
                
            </div>
        </div>
        );
}