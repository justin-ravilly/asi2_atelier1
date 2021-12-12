import React  from 'react';

export const Energy=(props)=>{
  return (
    <h2>
         Energy <span className="badge">{props.value}</span>
     </h2>
);
}