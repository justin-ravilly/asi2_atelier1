import axios from 'axios';
import {React,useState,useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../actions/index.js';
import Card from './../components/Card.js'
import {MenuBarre} from "./../../Menu/Menu.js"

export const Market =(props) =>{

const dispatch = useDispatch();
let user = useSelector(state => state.userReducer.current_user);
const [listeCartes,setListCartes] = useState([]);
const [isLoading,setIsLoading] = useState(true);

function UpdateList(id_card) {
    console.log("ID de la carte= "+id_card)
    const newListe = listeCartes.filter((carte) => carte.id !== id_card);
    for(const index_new of newListe) {
        console.log("New List Item = "+JSON.stringify(index_new));
    }
    setListCartes(newListe);
}

function buyCard(event,id_card) {
    event.preventDefault();
    console.log("Buy card activé");
    const user_card_data = {
        "user_id": user.id,
        "card_id": id_card
    }
    console.log("data = "+JSON.stringify(user_card_data));
    axios.post("https://asi2-backend-market.herokuapp.com/buy",user_card_data)
    .then(res => {
        if(res.data) {
            axios.get("https://asi2-backend-market.herokuapp.com/user/"+user.id)
            .then(res => {
                dispatch(updateUser(res.data));
                console.log("User = "+JSON.stringify(user))
                UpdateList(id_card)
            })
        } else {
            window.alert("Vous n'avez pas assez d'argent sur votre compte... Vendez vos cartes pour récupérer de l'argent");
        }
    })
  }

function sellCard(event,id_card) {
    event.preventDefault();
    console.log("Sell card activé");
    const user_card_data = {
        "user_id": user.id,
        "card_id": id_card
    }
    console.log("data = "+JSON.stringify(user_card_data));
    axios.post("https://asi2-backend-market.herokuapp.com/sell",user_card_data)
    .then(res => {
        if(res.data) {
            axios.get("https://asi2-backend-market.herokuapp.com/user/"+user.id)
            .then(res => {
                dispatch(updateUser(res.data));
                console.log("User = "+JSON.stringify(user))
                UpdateList(id_card)
            })
        }
    })
}

useEffect(() => {
    if (props.type=="Vente") {        
        for(const index_card of user.cardList) {
            axios.get("https://asi2-backend-market.herokuapp.com/card/"+index_card)
            .then(res => {
            listeCartes.push(res.data);
            if (listeCartes.length == user.cardList.length) {
                setIsLoading(false);
                }
            })
        }
        if(user.cardList.length==0) {
            setIsLoading(false);
        }
    } else {
        console.log("Type = "+props.type)
        axios.get("https://asi2-backend-market.herokuapp.com/cards_to_sell")
        .then(res => {
            setListCartes(res.data);
            setIsLoading(false);
        })
    }
},[props.type]);

if (isLoading) {
    return (
        <div className="App">Loading...</div>
    );
};

if (props.type=="Vente") {
    var display = listeCartes.map(
        (carte) =>
        <Card carte={carte} fonction={sellCard}></Card>
    )
} else {
    var display = listeCartes.map(
        (carte) =>
        <Card carte={carte} fonction={buyCard}></Card>
    )
}

return  (
  <div>
    <MenuBarre>
    </MenuBarre>
    <div class="ui clearing segment">
        <h3 class="ui right floated header">
            <i class="user circle outline icon"></i>
            <div class="content">
                <span id="userNameId">{user.surName+" "+user.lastName}</span>
                <div class="sub header"><span>{user.account}</span>$</div>
            </div>
        </h3>

        <h3 class="ui left floated header">
            <i class="money icon"></i>
            <div class="content">
                SELL
                <div class="sub header">Sell your card to get money</div>
            </div>
        </h3>
    </div>
    <div class="ui grid">
        <div class="ten wide column">
              <h3 class="ui aligned header"> My Card List</h3>
            <table class="ui selectable celled table" id="cardListId">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Family</th>
                        <th>HP</th>
                        <th>Energy</th>
                        <th>Defence</th>
                        <th>Attack</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                </tbody>
            </table>
        </div>
        <div class=" five wide column">
            <div id="card"></div> 
        </div>
    </div>
  </div>
  );
}
export default Market;