var express = require("express"); 
const cors = require("cors");
var app = express();
app.use(cors());
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
});
var port = 8083;
var users_list=[];
var users_in_room=0;
var selected_card_list=[];
var users_count=0;
var roomname = "matchmaking";
var playroom = "room1"
var starting_user;
var next_turn_player;
var attacking_card;
var attacked_card;
var difference;
var players_hp = {
    player_one : 100,
    player_two : 100
};

function checkEndGame() {
    console.log("Vérification en cours..."+players_hp.player_one+" "+players_hp.player_two);
    if (players_hp.player_one<=0) {
        console.log("Joueur 1 a perdu");
        io.to(playroom).emit("Fin de partie",{
            winner: users_list[1],
            win: 100
        })
        return
    } else if (players_hp.player_two<=0) {
        console.log("Joueur 2 a perdu");
        io.to(playroom).emit("Fin de partie",{
            winner: users_list[0],
            win: 100
        })
        return
    } 
    else {
        io.to(playroom).emit("Update hp",players_hp);
        return
    }
}

io.on("connection", function (socket) {
    console.log("Connexion supplémentaire detectée : "+socket.id);
    socket.on("Search an opponent", (data) => {
        users_list.push(data.username);
        selected_card_list.push(data.card_selected);
        users_count+=1;
        console.log("Liste actuelle des utilisateurs : "+users_list);
        socket.join(roomname);
        if(users_count==2) {
            console.log("Matchmaking done");
            io.to(roomname).emit("Opponent found", {
                first_user_name: users_list[0],
                first_user_card: selected_card_list[0],
                second_user_name: users_list[1],
                second_user_card: selected_card_list[1]
            });
        }
    });
    socket.on("Initialize game", ()=>{
        users_in_room++;
        socket.join(playroom);
        if(users_in_room==2) {
            if(Math.random()>0.5) {
                starting_user=users_list[0];
                console.log("Joueur 1 démarre");
            } else {
                starting_user=users_list[1];
                console.log("Joueur 2 démarre");
            }
            io.to(playroom).emit("Let's play",{data:starting_user});
        }
    })
    socket.on("Attack",(player) =>{
        if(player==users_list[0]) {
            attacking_card=selected_card_list[0];
            attacked_card=selected_card_list[1];
        } else {
            attacking_card=selected_card_list[1];
            attacked_card=selected_card_list[0]; 
        }
        if(attacking_card.attack >=attacked_card.defence) {
            console.log("Cas n°1");
            difference=Math.trunc(attacking_card.attack-attacked_card.defence);
            console.log("Difference : "+difference);
            if(player==users_list[0]) {
                console.log("Cas n°1.1");
                players_hp={
                    player_turn:player,
                    player_one:players_hp.player_one,
                    player_two:players_hp.player_two-difference
                }
                console.log("Nouveau statut des pv des joueurs : "+JSON.stringify(players_hp));
            } else {
                console.log("Cas n°1.2");
                players_hp={
                    player_turn:player,
                    player_one: players_hp.player_two,
                    player_two: players_hp.player_one-difference
                }
                console.log("Nouveau statut des pv des joueurs : "+JSON.stringify(players_hp));
            }
        } else {
            console.log("Cas n°2");
            difference=Math.trunc(attacked_card.defence-attacking_card.attack);
            console.log("Difference : "+difference);
            if(player==users_list[0]) {
                console.log("Cas n°2.1");
                players_hp={
                    player_turn:player,
                    player_one:players_hp.player_one-Math.trunc(difference/2),
                    player_two:players_hp.player_two-difference
                }
                console.log("Nouveau statut des pv des joueurs : "+JSON.stringify(players_hp));
            } else {
                console.log("Cas n°2.2");
                players_hp={
                    player_turn:player,
                    player_one: players_hp.player_two-Math.trunc(difference/2),
                    player_two: players_hp.player_one-difference
                }
                console.log("Nouveau statut des pv des joueurs : "+JSON.stringify(players_hp));
            }
        }
        checkEndGame()
    })
    socket.on("End Turn", (user) => {
        if(user==users_list[0]) {
            next_turn_player = users_list[1];
        } else {
            next_turn_player = users_list[0];
        }
        io.to(playroom).emit("Switch Turn",next_turn_player);
    })
});

http.listen(port, () => {
    console.log("Application en cours de fonctionnement sur le port "+port);
});