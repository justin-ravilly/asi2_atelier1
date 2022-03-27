var express = require("express"); 
const cors = require("cors");
var app = express();
app.use(cors());
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
    cors: {
        origin: '*',
        //methods: ["GET", "POST"]
    }
});
var port = 8084;
var users_list=[];
var users_count=0;
var roomname = "room 1"

io.on("connection", function (socket) {
    console.log("Connexion supplémentaire detectée : "+socket.id);
    socket.on("Connect to the server", (data) => {
        users_list.push(data.username);
        users_count+=1;
        console.log("Liste actuelle des utilisateurs : "+users_list);
        console.log("Taille liste actuelle des utilisateurs : "+users_list.length);
        //Matchmaking temporaire
        socket.join(roomname);
        if(users_count==2) {
            console.log("Matchmaking done");
        }
    });
    socket.on("Send message", (data) => {
    io.to(roomname).emit("Send message", {from: data.from,text: data.message});
    });
});

http.listen(port, () => {
    console.log("Application en cours de fonctionnement sur le port "+port);
});