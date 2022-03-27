import React from 'react';

export const Card_selection =(props) =>{
    const card =
        {
            "id": props.carte.id,
            "name": props.carte.name,
            "description": props.carte.description,
            "family" : props.carte.family,
            "hp": props.carte.hp,
            "energy": props.carte.energy,
            "defense": props.carte.defence,
            "attack": props.carte.attack,
            "price": props.carte.price,
            "image" : props.carte.imgUrl
        }

    return (
        <tr>
          <td>
              <img  class="ui avatar image" src={card.image}/> <span>{card.name}</span>
          </td>
          <td>{card.description}</td>
          <td>{card.family}</td>
          <td>{card.hp}</td>
          <td>{card.energy}</td>
          <td>{card.defense}</td>
          <td>{card.attack}</td>
          <td>{card.price}$</td>
          <td>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ></input>
            </div>
          </td>
        </tr>
    );
}
export default Card_selection;