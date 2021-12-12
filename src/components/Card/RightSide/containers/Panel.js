import React from 'react';
import {Visual} from '../../Cards/containers/Visual'
import {Price} from '../../Part/containers/Price'
import {Attack} from '../../Part/containers/Attack'
import {Life} from '../../Part/containers/Life'
import {Energy} from '../../Part/containers/Energy'
import {Defense} from '../../Part/containers/Defense'
export const Panel =(props)=>{
    if(props.robot == undefined){return (<div></div>);}
    return (
            <div className="jumbotron">
                <h1 className="display-3">{props.robot.title}</h1>
                
                <p className="lead">Detailed information of the card {props.robot.id} called {props.robot.title}</p>    
                <p className="lead">From the family called {props.robot.famille}</p>
                <Life value={props.robot.life}/>                  
                <Attack value={props.robot.attack}/>
                <Energy value={props.robot.energy}/>
                <Defense value={props.robot.defense}/>
                            
                <hr className="my-4"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-lg-6" >
                            <Visual 
                                type={props.robot.visual_type} 
                                src={props.robot.visual_src} 
                            />
                            <div className="row">                
                            <Price value={props.robot.price}/>
                            
                            </div>
                            
                        </div>
                        <div className="col-md-6 col-lg-6" >
                            <p> {props.robot.description}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
}