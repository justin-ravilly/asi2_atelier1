import {React,useEffect} from 'react';
import {MenuBarre} from "./../Menu/Menu.js";
import {io} from 'socket.io-client';
import {useSelector} from 'react-redux';
import moment from 'moment';
let socket_chat;

export const Chat =(props) =>{

    let user = useSelector(state => state.userReducer.current_user);

    useEffect(() => {
        socket_chat = io("http://localhost:8084", {
            origins: "*"
        });
        socket_chat.emit("Connect to the server", {username : user.surName+" "+user.lastName}); 
    },[]);

    useEffect(() => {
        socket_chat.on("Send message",(content) => {
            Recieve_message(content)
        })
    },[])

    function Send_message() {
        let text_to_send = document.getElementById("Message_Area").value;
        if (text_to_send !== "") {
            let data_to_send={
                from : user.surName+" "+user.lastName,
                message : text_to_send
            }
            socket_chat.emit("Send message",data_to_send);
            document.getElementById("Message_Area").value="";
        }
    }

    function Recieve_message(message) {
        const newDiv = document.createElement("div");
        newDiv.className="ui raised segment"
        const newA = document.createElement("a");
        if (message.from=== user.surName+" "+user.lastName) {
            newA.className="ui green right ribbon label";
        } else {
            newA.className="ui red ribbon label";
        }
        newA.innerHTML=message.from;
        const newSpan = document.createElement("span");
        newSpan.innerHTML = moment().format("hh:mm:ss");
        const newPara = document.createElement("p");
        newPara.innerHTML=message.text;
        newDiv.appendChild(newA);
        newDiv.appendChild(newSpan);
        newDiv.appendChild(newPara);
        document.getElementById("messages").appendChild(newDiv);
    }

    return  (
    <div class="ui segment">
            <div class="column">
                <div class="ui segment">
                    <div class="ui top attached label">
                        <div class="ui two column grid">                                       
                            <div class="column">Chat</div>
                                <div class="column">
                                    <div class="ui two column grid">
                                        <div class="column">{user.surName+" "+user.lastName}</div>
                                        <div class="column"> <i class="user circle icon"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="ui segment" id="messages">
                </div>
                <div class="ui form">
                    <div class="field">
                        <textarea id="Message_Area" rows="2"></textarea>
                    </div>
                </div>
                <button onClick={Send_message} class="fluid ui right labeled icon button" id="myButton">
                    <i class="right arrow icon"></i>
                    Send
                </button>
            </div>
    </div>
    );
}
export default Chat;