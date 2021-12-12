import React from 'react';
import {Panel} from './containers/Panel';
import { useSelector } from 'react-redux';


export const RightSide=(props)=>{
  let robot = useSelector(state=> state.robotReducer);

  if(robot.id == undefined){
    return <div></div>;
  }

  return (
      <div>
          <Panel robot={robot}/>
      </div>
  );
}