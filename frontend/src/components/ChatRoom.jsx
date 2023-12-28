import React, {useEffect, useState} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import io from "socket.io-client";
const socket = io.connect('http://localhost:3000');
const ChatRoom = ({category, username, topic}) => {
    const [message, setMessage] = useState("");
    const [messageRecieved, setMessageRecieved] = useState("");
    const [room, setRoom] = useState("");
    const sendMessage = () =>{
        socket.emit("Message sent", message);
    }
    useEffect(()=>{
        const joinRoom = () =>{
            socket.emit("join_room", room);
        }
        socket.on("recieve_message", (data)=>{
            setMessageRecieved(data);
        })
    },[socket])
  return (
    <Box>
        <Typography>Hi {username}</Typography>
        <TextField placeholder='message' label='Write Message' fullWidth size='small' name='message' onChange={(e)=>{setMessage(e.target.value)}}/>
        <Button onClick={sendMessage}>Send Message</Button>
        <h4>Message: {messageRecieved}</h4>
    </Box>
  )
}

export default ChatRoom