import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import styled from "styled-components";
import { Box, Button, TextField, Typography } from "@mui/material";
const socket = io.connect("http://localhost:3000");
const ChatRoom= () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <Root className="chat-room">
      {!showChat ? (
        <Box className="joinChatContainer">
          <Typography variant="h5" style={{color: "#0a686e", marginBottom: "10px"}}>Join Debate Room</Typography>
          <TextField
            type="text"
            size="small"
            placeholder="Username"
            className="text-field"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            type="text"
            size="small"
            placeholder="Enter Debate Room Id"
            className="text-field"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <Button variant="contained" onClick={joinRoom} className="join">Join</Button>
        </Box>
      ) : (
        <Chat socket={socket} username={username} room={room} onCloseChat={()=> setShowChat(false)}/>
      )}
    </Root>
  );
}

const Root = styled.div`
  padding-top: 30px;
 .joinChatContainer {
    padding: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 80%;
    border: 2px solid #0a686e;
    border-radius: 10px;
    margin: auto;
  }
  .text-field{
    margin-top: 10px;
  }
  .join{
    width: 30%;
    margin: auto;
    margin-top: 10px;
    background-color: #0a686e;
  }
`
export default ChatRoom;