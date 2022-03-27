import React from 'react';

export const Card_short =(props) =>{
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
        <div class="ui special cards">
            <div class="card">
                <div class="content">
                    <div class="ui grid">
                        <div class="three column row">
                            <div class="column" style={{"text-align": "center"}}>
                                <a class="ui red circular label">{card.hp}</a>
                            </div>
                            <div class="column" >
                                <h5>{card.name}</h5>
                            </div>
                            <div class="column" style={{"text-align": "center"}}>
                                <a class="ui yellow circular label">{card.energy}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image imageCard">
                    <div class="ui fluid image">
                        <img id="cardImgId" class="ui centered image" src={card.image}/>
                    </div>
                </div>
            </div>  
        </div>
    );
}
export default Card_short;