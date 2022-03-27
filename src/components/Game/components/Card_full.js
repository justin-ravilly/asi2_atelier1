import React from 'react';

export const Card_full =(props) =>{
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
                        <div class="column">
                            <i class="heart outline icon"></i><span id="cardHPId">{card.hp}</span> 
                        </div>
                        <div class="column">
                                <h5>{card.family}</h5>
                        </div>
                        <div class="column">
                            <span id="energyId">{card.energy}</span> <i class="lightning icon"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="image imageCard">
                <div class="blurring dimmable image">
                    <div class="ui fluid image">
                        <a class="ui left corner label">
                            {card.name}
                        </a>
                        <img id="cardImgId" class="ui centered image" src={card.image}/>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="ui form tiny">
                    <div class="field">
                        <label id="cardNameId"></label>
                        <textarea id="cardDescriptionId" class="overflowHiden" readonly="" rows="2">{card.description}</textarea>
                    </div>
                </div>
            </div>
            <div class="content">
                <i class="heart outline icon"></i><span id="cardHPId"> HP {card.hp}</span> 
                <div class="right floated ">
                    <span id="cardEnergyId">Energy {card.energy}</span>
                    <i class="lightning icon"></i> 
                </div>
            </div>
            <div class="content">
                <span class="right floated">
                <span id="cardAttackId"> Attack {card.attack}</span> 
                <i class=" wizard icon"></i>
                </span>
                <i class="protect icon"></i>
                <span id="cardDefenceId">Defense {card.defense}</span> 
            </div>
            <div class="ui bottom attached button">
                <i class="money icon"></i>
                Actual Value <span id="cardPriceId"> {card.price}$</span>
            </div>
        </div>
    </div>
    );
}
export default Card_full;