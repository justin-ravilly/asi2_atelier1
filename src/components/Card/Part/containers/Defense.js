import React  from 'react';

export const Defense=(props)=>{
  return (
    <h2>
         Defense <span className="badge">{props.value}</span>
     </h2>
);
}