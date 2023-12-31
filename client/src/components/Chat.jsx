import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
//import css
import './style/Chat.css';
import Messages from "./Messages";
import TextContainer from "./TextContainer";
let socket;
const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const API = "localhost:5000";
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(API);
        setName(name);
        setRoom(room);
        socket.emit("join", { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
        // return () => {
        //     socket.emit("disconnect");
        //     socket.off();
        // };
    }, [API, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log('berjalaan');
            setMessages([...messages, message]);
        });
        // socket.on('message', message => {
        //     setMessages(messages => [...messages, message]);
        // });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    //function for sending messages
    const sendMessage = () => {
        // event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <div>
            </div>
            {/* <TextContainer users={users} /> */}
        </div>
    );
};

export default Chat;
