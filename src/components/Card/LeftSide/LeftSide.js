import React, { Component } from 'react';
import {Robot} from '../Cards/Card';
export const LeftSide =(props)=>{
    
    function getAllRobotRender(){
        let array_render=[];
        
        for(var i=0;i<props.robots.robots.length;i++){
            
            array_render.push(
                <Robot
                   key={i}
                   robot={props.robots.robots[i]}
                   handleOnRobotSelected={props.handleOnRobotSelected}
                />
                );
        }
        return array_render;
    }

    const display_list = getAllRobotRender();
    return (
            
            <div>
               <table class="ui selectable celled table" id="cardListId">
                    <thead>
                        <tr>
                            <pre>Name:   Price:    Family:   Life:   Energy:   Defence:   Attack:   Description:</pre>
                            
                        </tr>
                    </thead>
                    </table>  
               {display_list}
            </div>
    );
}
