import React, { Component } from 'react';

export const Label =(props)=>{
  return (
    <div>
       <pre>
            
            {props.title}    {props.price}    {props.famille}    {props.life}      {props.energy}         {props.defense}        {props.attack}       {props.description}
   </pre>
    </div>

);
}