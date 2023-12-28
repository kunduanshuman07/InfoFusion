import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography, InputAdornment, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from "@mui/icons-material/Close";
import { GlobalStyles } from "@mui/system";
const ScrollbarStyles = (
    <GlobalStyles
        styles={{
            '*::-webkit-scrollbar': {
                width: '0.4em'
            },
            '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.1)'
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: '#086D67',
            }
        }}
    />
);

function Chat({ socket, username, room, onCloseChat }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <>
            {ScrollbarStyles}
            <Dialog open={true} onClose={onCloseChat} fullScreen>
                <DialogTitle
                    sx={{
                        backgroundColor: "#086D67",
                        fontSize: "16px",
                        display: "flex"
                    }}
                >
                    <Typography style={{ color: "white" }}>Debate Room Id: #{room}</Typography>
                    <Typography style={{ color: "white", margin: " auto", fontWeight: "bolder" }}>Live Chat</Typography>
                    <CloseIcon className="close-icon" style={{ color: 'white', cursor: "pointer" }} onClick={onCloseChat} />
                </DialogTitle>
                <DialogContent style={{ padding: "20px 25px 10px 25px" }}>
                    <Root className="chat-window">
                        <Box className="chat-send">
                            <TextField
                                type="text"
                                fullWidth
                                multiline
                                value={currentMessage}
                                size="small"
                                placeholder="Your take on the topic"
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value);
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={sendMessage} size='small'>
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <ScrollToBottom>
                            <Box className="chat-body">
                                <Box className="message-container">
                                    {messageList.map((messageContent, index) => (
                                        <Box
                                            key={index}
                                            className={username === messageContent.author ? "yourmessage" : "othermessage"}
                                        >
                                            <Box className="message-meta">
                                                {username === messageContent.author ? <><Box className="message-content">
                                                    <Typography>{messageContent.message}</Typography>
                                                </Box>
                                                    <IconButton>
                                                        <Avatar alt={messageContent.author} src='avatar' className='avatar-style' />
                                                    </IconButton></> : <>
                                                    <IconButton>
                                                        <Avatar alt={messageContent.author} src='avatar' className='avatar-style' />
                                                    </IconButton>
                                                    <Box className="message-content">
                                                        <Typography>{messageContent.message}</Typography>
                                                    </Box></>
                                                }
                                            </Box>

                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </ScrollToBottom>

                    </Root>
                </DialogContent>
            </Dialog>
        </>
    );
}

const Root = styled.div`
    .chat-window {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .chat-send{
        position: sticky;
        z-index: 1;
    }
    .chat-body {
        overflow-y: auto;
        flex-grow: 1;
        border-top: 2px solid #086D67;
        margin-top: 10px;
        padding-top: 10px;
    }

    .close-icon {
        color: white;
    }
    .message-container{
        display: flex;
        flex-direction: column;
    }
    .yourmessage {
        margin-left: auto;
        max-width: 50%;
    }

    .othermessage {
        margin-right: auto;
        max-width: 50%;
    }
    .message-meta{
        display: flex;
        flex-direction: row;
    }
    .message-content{
        margin: auto;
        padding: 10px;
        border: 2px solid #ddd;
        border-radius: 10px;
    }
    .avatar-style{
        background-color: #42d1f5;
    }
`;

export default Chat;
