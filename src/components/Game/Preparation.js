import axios from 'axios';
import {React,useEffect,useState} from 'react';
import {Button} from 'semantic-ui-react';
import {MenuBarre} from "./../Menu/Menu.js";
import {Card_selection} from "./../Game/Card_selection.js"
import {io} from 'socket.io-client';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router';
import {updateGameData, updateSelectedCard,updateHp} from '../../actions';
let socket_jeu;

export const Preparation =(props) =>{

    let user = useSelector(state => state.userReducer.current_user);
    const [listeCartes,setListCartes] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isSearching,setIsSearching] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const players_hp = {
        player_one : 100,
        player_two : 100
    };
    dispatch(updateHp(players_hp));
    useEffect(() =>{
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
    },[]);

    useEffect(() =>{
        socket_jeu = io("http://localhost:8083", {
            reconnection: true,
            origins: "*"
        });
    },[]);

    useEffect(() =>{
        socket_jeu.on("Opponent found",(game) =>{
            setIsSearching(false);
            dispatch(updateGameData(game));
            navigate("/arena");
        });
    },[]);

    function TimeToPlay() {
        let selected_cards_count=0;
        let selected_cards = document.getElementsByClassName("form-check-input");
        let selected_cards_index=[];
        for(let index=0;index<selected_cards.length;index++) {
            if(selected_cards[index].checked===true) {
                selected_cards_count ++;
                selected_cards_index.push(index);
            }
        }
        if(selected_cards_count===1) {
            dispatch(updateSelectedCard(listeCartes[selected_cards_index[0]]))
            socket_jeu.emit("Search an opponent",{username : user.surName+" "+user.lastName,card_selected: listeCartes[selected_cards_index[0]]});
            setIsSearching(true);
        } else {
            window.alert("Veuillez ne prendre qu'une seule carte");
        }
    };

    var display = listeCartes.map(
        (carte) =>
        <Card_selection carte={carte}></Card_selection>
    )

    if (isLoading) {
        return (
            <div className="App">Loading...</div>
        );
    };

    if (isSearching) {
        return (
            <div className="App">Recherche d'un adversaire en cours...
            <div>Veuillez patienter</div>
            </div>
        );
    };

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
                        <th>Selected</th>
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
        <Button type='submit' onClick={TimeToPlay}>Test TimeToPlay</Button>
    </div>
    );
}
export default Preparation;