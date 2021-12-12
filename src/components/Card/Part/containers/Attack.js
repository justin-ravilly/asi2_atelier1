import React  from 'react';

export const Attack=(props)=>{
  return (
    <h2>
         Attack <span className="badge">{props.value}</span>
     </h2>
);
}