import {React,useEffect,useState} from 'react';
import {MenuBarre} from "./../Menu/Menu.js";
import Card_short from "./components/Card_short.js"
import Card_full from "./components/Card_full.js"
import Chat from "./Chat.js"
import Player_display from './components/Player_display.js';
import {io} from 'socket.io-client';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router';
import {updateHp,updateUser} from '../../actions';
let socket_jeu;

export const Game =(props) =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector(state => state.userReducer.current_user);
    let selected_card = useSelector(state => state.cardReducer.current_selected_card);
    let game_data = useSelector(state => state.gameReducer.current_gameData);
    const [opponent,SetOpponent]=useState("");
    const [opponentCard,SetCardOpponent]=useState({});
    const [player_turn,SetPlayer_turn] = useState("");
    const [hasPlayed,SetHasPlayed] = useState(false);
    const [player_hp,SetPlayerHp] = useState(100);
    const [opponent_hp,SetOpponentHp] = useState(100);
    useEffect(() => {
        if(game_data.first_user_name === user.surName+" "+user.lastName) {
            SetOpponent(game_data.second_user_name);
            SetCardOpponent(game_data.second_user_card);
        } else {
            SetOpponent(game_data.first_user_name);
            SetCardOpponent(game_data.first_user_card);
            };
    },[]);
    function UpdateHP(data) {
        console.log("MAJ en cours"+JSON.stringify(data));
        if(data.player_turn==user.surName+" "+user.lastName) {
            console.log("Cas n°1");
            SetPlayerHp(data.player_one);
            SetOpponentHp(data.player_two);
        } else {
            console.log("Cas n°2");
            SetPlayerHp(data.player_two);
            SetOpponentHp(data.player_one);
        }
    }

    useEffect(() => {
        socket_jeu = io("http://localhost:8083", {
            reconnection: true,
            origins: "*"
        });
        socket_jeu.emit("Initialize game");
    },[]);

    useEffect(() =>{
        socket_jeu.on("Let's play",(starter)=>{
            SetPlayer_turn(starter.data);
        })
        console.log("Au tour de : "+player_turn);
    },[]);

    useEffect(()=>{
        socket_jeu.on("Update hp",(new_players_hp) =>{
            console.log(JSON.stringify(new_players_hp));
            dispatch(updateHp(new_players_hp));
            UpdateHP(new_players_hp);
        })
    },[]);

    useEffect(()=>{
        socket_jeu.on("Switch Turn",(next_player) =>{
            SetPlayer_turn(next_player);
        })
    },[]);

    useEffect(() => {
        socket_jeu.on("Fin de partie",(data) =>{
            console.log("Fin de partie");
            if(data.winner==user.surName+" "+user.lastName) {
                user.account=user.account+data.win
                dispatch(updateUser(user));
                window.alert("Bravo! Vous avez gagné 100$ de récompense");
            } else {
                user.account=user.account-data.win
                dispatch(updateUser(user));
                window.alert("Oups... Vous avez perdu 100$");
            }
            navigate("/");
        })
    },[]);

    function Attack() {
        console.log("Attaque lancée");
        if (!hasPlayed) {
            if (player_turn==user.surName+" "+user.lastName) {
                console.log("Je lance mon attaque");
                socket_jeu.emit("Attack",player_turn);
                SetHasPlayed(true);
            } else {
                console.log("Ce n'est pas ton tour...");
            }
        } else {
            window.alert("Vous avez déja joué veuillez terminer votre tour");
        }
    };

    function EndMyTurn() {
        if (player_turn==user.surName+" "+user.lastName) {
            console.log("Mon tour est terminé");
            SetHasPlayed(false);
            socket_jeu.emit("End Turn",player_turn);
        } else {
            console.log("Ce n'est pas ton tour...");
        }
    };

    return (
    <div class="app">
    <MenuBarre>
    </MenuBarre>
    <div>Au tour de {player_turn}</div>
    <div class="ui segment">
        <div class="ui grid">
            <div class="four wide column">
                <Chat></Chat> 
            </div>
            <div class="twelve wide column">
                <div class="row">
                    <div class="ui grid">
                        <Player_display name={opponent} hp={opponent_hp}></Player_display>
                        <div class="ten wide column">
                            <div class="ui one column grid">
                                <div class="column">
                                    <Card_short carte={opponentCard}></Card_short>
                                </div>
                            </div>
                        </div>
                        <div class="four wide column">
                            <Card_full carte={opponentCard}></Card_full> 
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="ui grid ">
                        <div class="twelve wide column">
                            <h4 class="ui horizontal divider header">
                                VS
                            </h4>                                                      
                        </div>
                        <div class="four wide column">
                            <button onClick={Attack} class="huge ui primary button">
                                Attack
                            </button>
                            <button onClick={EndMyTurn} class="huge ui primary button">
                                End Turn
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="ui grid">
                        <Player_display name={user.surName+" "+user.lastName} hp={player_hp}></Player_display>
                        <div class="ten wide column">
                            <div class="ui one column grid">
                                <div class="column">
                                    <Card_short carte={selected_card}></Card_short>
                                </div>
                            </div>
                        </div>
                        <div class="four wide column">
                            <Card_full carte={selected_card}></Card_full> 
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    </div>
    )
}
export default Game;