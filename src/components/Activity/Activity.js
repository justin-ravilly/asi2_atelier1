import React, {useState} from 'react';
import '../../lib/Semantic-UI-CSS-master/semantic.min.css';
import '../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import {LeftSide} from '../Card/LeftSide/LeftSide';
import {RightSide} from '../Card/RightSide/RightSide';
import { Container } from 'semantic-ui-react';
import * as jsonSource from '../../sources/robots_parts.json';

//Create function component
export const Activity =(props) =>{
    const [robots, setRobots] = useState(jsonSource.default);
    const [selectedRobotId, setSelectedRobotId] = useState(0);


    function handleOnRobotSelected(id){
        console.log("selected robot id:"+id);
        setSelectedRobotId(id);
        const current_robot_obj=getRobotFromId(id);
        console.log(current_robot_obj.parts);
    }
              
    function getRobotFromId(id){
        for(var i=0;i<robots.robots.length;i++){
                if(robots.robots[i].id==id){
                    return robots.robots[i];
                }
            }
            return {};
    }
    return (
        <div class="ui grid">
            <div class="ten wide column">
                 <h3 class="ui aligned header"> My Card List</h3>
            <div className="row">
                <div className="col-md-8 col-lg-8" >
                    <LeftSide 
                        robots={robots}
                    />
                </div>
                <div className="col-md-4 col-lg-4" >
                    <RightSide />
                </div>
                </div>
            </div>
            
            </div>
    );
}