import React  from 'react';

export const Life=(props)=>{
  return (
    <h2>
         Life <span className="badge">{props.value}</span>
     </h2>
);
}