import { Avatar, Box, Button, IconButton, Typography, TextField, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import LanIcon from '@mui/icons-material/Lan';
import { useNavigate } from 'react-router-dom';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from "@mui/icons-material/Search";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import CloseIcon from "@mui/icons-material/Close";
import moment from 'moment';
const ConnectNotifications = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [messageSecondUser, setMessageSecondUser] = useState();
  const [conversations, setConversations] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [infoBox, setInfoBox] = useState('chat');
  const [allConnections, setAllConnections] = useState([]);
  const [requestedConnections, setRequestedConnections] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [myConnections, setMyConnections] = useState([]);
  const [networkState, setNetworkState] = useState('mine');
  const [messageModel, setMessageModel] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const handleSendMessageFromNetwork = (secondUser) => {
    setMessageSecondUser(secondUser);
    setMessageModel(true);
    setInfoBox('chat');
  }

  const handleSendMessage = async (secondUser) => {
    const messageData = {
      userId: user._id,
      secondUserId: secondUser._id,
      message: currentMessage,
      messageTime: moment(new Date()).toISOString()
    }
    await axios.post('http://localhost:3000/user/send-message', messageData);
    const { data } = await axios.post('http://localhost:3000/user/fetch-messages', { userId: user._id, secondUserId: messageSecondUser._id });
    setConversations(data);
  }

  const handleCloseMessageModel = () => {
    setMessageModel(false);
  }
  const handleSendRequest = async (connectUserId) => {
    await axios.post('http://localhost:3000/user/send-connection-request', { actualUserId: user._id, connectionUserId: connectUserId });
    setNetworkState('requested');
  }
  const handleDeleteRequest = async (connectUserId) => {

  }
  const handleAcceptRequest = async (connectUserId) => {
    await axios.post('http://localhost:3000/user/approve-connection-request', { actualUserId: user._id, connectionUserId: connectUserId });
    setNetworkState('mine')
  }
  useEffect(() => {
    if (infoBox === 'chat') {
      const fetchAllMessages = async () => {
        const { data } = await axios.post('http://localhost:3000/user/fetch-all-messages', { userId: user._id });
        setAllMessages(data);
      }
      fetchAllMessages();
    }
  }, [infoBox])
  useEffect(() => {
    if (messageModel === true && infoBox === 'chat') {
      const fetchMessages = async () => {
        const { data } = await axios.post('http://localhost:3000/user/fetch-messages', { userId: user._id, secondUserId: messageSecondUser._id });
        setConversations(data);
      }
      fetchMessages();
    }
  }, [messageModel]);

  useEffect(() => {
    const fetchAllNetworkState = async () => {
      const { data } = await axios.post('http://localhost:3000/user/get-if-network', { userId: user._id });
      setAllConnections(data);
      setMyConnections([]);
      setRequestedConnections([]);
      setConnectionRequests([]);
    }
    const fetchMyNetworkState = async () => {
      const { data } = await axios.post('http://localhost:3000/user/my-connections', { userId: user._id });
      setAllConnections([]);
      setMyConnections(data);
      setRequestedConnections([]);
      setConnectionRequests([]);
    }
    const fetchRequestedNetworkState = async () => {
      const { data } = await axios.post('http://localhost:3000/user/requested-connections', { userId: user._id });
      setAllConnections([]);
      setMyConnections([]);
      setRequestedConnections(data);
      setConnectionRequests([]);
    }
    const fetchRequestNetworkState = async () => {
      const { data } = await axios.post('http://localhost:3000/user/connection-requests', { userId: user._id });
      setAllConnections([]);
      setMyConnections([]);
      setRequestedConnections([]);
      setConnectionRequests(data);
    }
    if (networkState === 'all') {
      fetchAllNetworkState();
    }
    if (networkState === 'mine') {
      fetchMyNetworkState();
    }
    if (networkState === 'requested') {
      fetchRequestedNetworkState();
    }
    if (networkState === 'requests') {
      fetchRequestNetworkState();
    }
  }, [networkState]);
  useEffect(() => {
    if (infoBox === 'notifications') {
      const fetchNotifications = async () => {
        const { data } = await axios.post('http://localhost:3000/user/fetch-notifications', { userId: user._id });
        setAllNotifications(data);
      }
      fetchNotifications();
    }
  }, [infoBox])
  const formatDate = (originalDate) => {
    const parsedDate = moment(originalDate);
    const formattedDate = parsedDate.format('DD-MM-YY HH:mm:ss');
    return formattedDate;
  }

  return (
    <Root>
      <Box className='container'>
        <Box className='app-bar'>
          <Button startIcon={<MailOutlineIcon />} className='message-btn' onClick={() => setInfoBox('chat')} style={{ backgroundColor: infoBox === 'chat' && 'white', color: infoBox === 'chat' && "#0072e5" }}>Messages</Button>
          <Button startIcon={<CircleNotificationsIcon />} className='noti-btn' onClick={() => setInfoBox('notifications')} style={{ backgroundColor: infoBox === 'notifications' && 'white', color: infoBox === 'notifications' && "#0072e5" }}>Notifications</Button>
          <Button startIcon={<LanIcon />} className='network-btn' onClick={() => setInfoBox('network')} style={{ backgroundColor: infoBox === 'network' && 'white', color: infoBox === 'network' && "#0072e5" }}>Network</Button>
        </Box>
        {infoBox === 'chat' &&
          <>
            {messageModel ? <Box className='message-container'>

              <Box className='header'>
                <Avatar src={`http://localhost:3000/userImages/${messageSecondUser?.picturePath}`} alt={messageSecondUser?.name} />
                <Typography className='header-text'>{messageSecondUser?.name}</Typography>
                <IconButton className='close-btn' onClick={handleCloseMessageModel}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box className='messages'>
                {conversations?.map((messages) => (
                  messages.type === 'mymessage' ?
                    <Box className='my-message'>
                      <Typography className='my-message-text'>{messages?.message?.messageText}</Typography>
                      <Typography className='my-timer'>{formatDate(messages?.message?.messageTime)}</Typography>
                    </Box> :
                    <Box className='your-message'>
                      <Typography className='your-message-text'>{messages?.message?.messageText}</Typography>
                      <Typography className='your-timer'>{formatDate(messages?.message?.messageTime)}</Typography>
                    </Box>

                ))}
              </Box>
              <Box className='text-field'>
                <TextField placeholder='Message' size='small' fullWidth InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button className='send-btn' onClick={() => handleSendMessage(messageSecondUser)}>Send</Button>
                    </InputAdornment>
                  )
                }}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />
              </Box>
            </Box>
              :
              <Box className='chat-container'>
                {allMessages?.map(users => (
                  <Box className='chat' onClick={() => handleSendMessageFromNetwork(users?.secondUser)}>
                    <Avatar src={`http://localhost:3000/userImages/${users?.secondUser?.picturePath}`} alt={users?.secondUser?.name} />
                    <Box className='chat-header'>
                      <Typography className='chat-name'>{users?.secondUser?.name}</Typography>
                      <Typography className='chat-overview'>Hi Anshuman How are you?</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            }
          </>
        }
        {infoBox === 'notifications' &&
          <Box className='notification-container'>
            {allNotifications.length===0 && <Typography className='no-data-text'>No notifications to display!</Typography>}
            {allNotifications?.map((notification) => (
              <Box className='notifications'>
                <IconButton style={{ margin: "-6px 0px" }}><CircleNotificationsIcon style={{ color: "#0072e5", fontSize: "35px" }} /></IconButton>
                <Box className='notify-box'>
                  <Typography className='notify'>{notification.notificationText}</Typography>
                  <Typography className='notify-time'>{formatDate(notification.notificationTime)}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        }
        {infoBox === 'network' &&
          <Box className='network'>
            <Box className='network-header'>
              <Avatar src={`http://localhost:3000/userImages/${user.picturePath}`} alt={user.userName} onClick={() => navigate(`/profile/${user._id}`)} />
              <Box className='network-username-name' onClick={() => navigate(`/profile/${user._id}`)}>
                <Typography className='network-name'>{user.name}</Typography>
                <Typography className='network-username'>@{user.username}</Typography>
              </Box>
              <Box className='connections-count'>
                <Button startIcon={<Diversity2Icon />} className='connections-count-btn' variant='outlined'>{user.connections.length} Connections</Button>
              </Box>
            </Box>
            <Box className='connections'>
              <Button className='mine' onClick={() => setNetworkState('mine')} style={{ backgroundColor: networkState === 'mine' && '#d7e7fa' }}>Mine</Button>
              <Button className='allc' onClick={() => setNetworkState('all')} style={{ backgroundColor: networkState === 'all' && '#d7e7fa' }}>IF Network</Button>
              <Button className='allc' onClick={() => setNetworkState('requests')} style={{ backgroundColor: networkState === 'requests' && '#d7e7fa' }}>Requests</Button>
              <Button className='allc' onClick={() => setNetworkState('requested')} style={{ backgroundColor: networkState === 'requested' && '#d7e7fa' }}>Requested</Button>
            </Box>
            {networkState === 'mine' && myConnections.map((users) => (
              <Box className='my-network-data'>
                <Avatar src={`http://localhost:3000/userImages/${users?.connectedUser?.picturePath}`} alt={users?.connectedUser?.name} onClick={() => navigate(`/profile/${users?.connectedUser?._id}`)} />
                <Box onClick={() => navigate(`/profile/${users?.connectedUser?._id}`)}>
                  <Typography className='connections-name'>{users?.connectedUser?.name}</Typography>
                  <Typography className='connections-username'>@{users?.connectedUser?.username}</Typography>
                </Box>
                <Box className='connection-actions'>
                  <IconButton><SendIcon style={{ color: '#0072e5' }} onClick={() => handleSendMessageFromNetwork(users.connectedUser)} /></IconButton>
                </Box>
              </Box>
            ))}
            {networkState === 'all' &&
              <>
                <Box sx={{ marginLeft: "100px", marginTop: "10px" }}>
                  <TextField
                    placeholder='Search User'
                    size='small'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size='small' className='search-icon'>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }} /></Box>
                {allConnections?.map((users) => (
                  users?.User?._id !== user?._id &&
                  <Box className='all-network-data'>
                    <Avatar src={`http://localhost:3000/userImages/${users?.User?.picturePath}`} alt={users?.User?.name} onClick={() => navigate(`/profile/${users._id}`)} />
                    <Box onClick={() => navigate(`/profile/${users?.User?._id}`)}>
                      <Typography className='connections-name'>{users?.User?.name}</Typography>
                      <Typography className='connections-username'>@{users?.User?.username}</Typography>

                    </Box>
                    <Box className='connection-actions'>
                      {users?.isConnection === false ? <IconButton onClick={() => handleSendRequest(users?.User._id)}><PersonAddIcon style={{ color: '#0072e5' }} /></IconButton> : <IconButton><PeopleIcon style={{ color: '#0072e5' }} /></IconButton>}
                    </Box>
                  </Box>
                ))}
              </>

            }
            {networkState === 'requested' &&
              requestedConnections.length === 0 ? <Typography className='no-data-text'>No sent requests!</Typography> : requestedConnections.map((user => (
                <Box className='requested-network-data'>
                  <Avatar src={`http://localhost:3000/userImages/${user?.connectedUser?.picturePath}`} alt={user?.connectedUser?.name} onClick={() => navigate(`/profile/${user?.connectedUser?._id}`)} />
                  <Box onClick={() => navigate(`/profile/${user?.connectedUser?._id}`)}>
                    <Typography className='connections-name'>{user?.connectedUser?.name}</Typography>
                    <Typography className='connections-username'>@{user?.connectedUser?.username}</Typography>

                  </Box>
                </Box>
              )))
            }
            {networkState === 'requests' &&
              connectionRequests.length === 0 ? <Typography className='no-data-text'>No requests for approval!</Typography> :
              connectionRequests.map((user) => (
                <Box className='requested-network-data'>
                  <Avatar src={`http://localhost:3000/userImages/${user?.connectedUser?.picturePath}`} alt={user?.connectedUser?.name} onClick={() => navigate(`/profile/${user?.connectedUser?._id}`)} />
                  <Box onClick={() => navigate(`/profile/${user?.connectedUser?._id}`)}>
                    <Typography className='connections-name'>{user?.connectedUser?.name}</Typography>
                    <Typography className='connections-username'>@{user?.connectedUser?.username}</Typography>

                  </Box>
                  <Box className='connection-actions'>
                    <IconButton onClick={() => handleAcceptRequest(user?.connectedUser?._id)}><HowToRegIcon style={{ color: '#0072e5' }} /></IconButton>
                    <IconButton onClick={() => handleDeleteRequest(user?.connectedUser?._id)}><DeleteIcon style={{ color: '#0072e5' }} /></IconButton>
                  </Box>
                </Box>
              ))
            }
          </Box>
        }
      </Box>
    </Root>
  )
}

const Root = styled.div`
  .container{
    display: flex;
    min-width: 480px;
    max-width: 480px;
    flex-direction: column;
    margin-top: 80px;
    margin-left: 50px;
    background-color: white;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
    border: 1px solid #d7e7fa;
    padding: 10px;
    border-radius: 20px;
    cursor:pointer;
    position: fixed;
  }
  .app-bar{
    display: flex;
    padding-bottom: 10px;
    border-bottom: 2px solid #d7e7fa;
  }
  .message-btn{
    text-transform: none;
    color: #444444;
    font-size: 15px;
    font-weight: bold;
    border-radius: 10px;
    padding: 0px 10px; 
  }
  .noti-btn{
    text-transform: none;
    color: #444444;
    font-size: 15px;
    font-weight: bold;
    border-radius: 10px;
    margin: auto;
    padding: 0px 10px; 
  }
  .network-btn{
    text-transform: none;
    color: #444444;
    font-size: 15px;
    font-weight: bold;
    border-radius: 10px;
    padding: 0px 10px; 
  }
  .chat-container{
    height:400px;
    max-height:400px;
    overflow-y:auto;
  }
  .chat{
    display: flex;
    margin-top: 15px;
  }
  .chat-header{
    margin-left: 20px;
  }
  .chat-name{
    font-weight: bold;
  }
  .chat-overview{
    font-weight: bold;
    color: #A5A5A5;
    font-size: 12px;
  }
  .notification-container{
    height:400px;
    max-height:400px;
    overflow-y:auto;
  }
  .notifications{
    display: flex;
    margin-top: 15px;
  }
  .notify-box{
    margin-left: 10px;
  }
  .notify{
    font-weight: bold;
    font-size: 15px;
  }
  .notify-time{
    font-weight: bold;
    color: #A5A5A5;
    font-size: 10px;
  }
  .network{
    displY: flex;
    flex-direction: column;
  }
  .network-header{
    display: flex;
    margin-top: 10px;
    padding: 10px;
    border-bottom: 2px solid  #d7e7fa;
  }
  .network-username-name{
    margin-left: 30px;
  }
  .network-name{
    font-weight: bold;
    color: #01264a;
    margin-top: -5px;
  }
  .network-username{
    font-size: 13px;
    font-weight: bold;
    color: #0072e5;
  }
  .connections-count{
    margin-left: 70px;

  }
  .connections{
    border-bottom: 2px solid #d7e7fa
    ;
  }
  .connections-count-btn{
    text-transform: none;
    font-weight: bold;
    border-radius: 10px;
    
  }
  .mine{
    color: #01264a;
    text-transform: none;
    font-weight: bold;
    margin-top: 10px;
    padding: 5px 20px;
    margin-bottom: 10px;
        border-radius: 20px;
        &:hover{
            background-color: #d7e7fa;
            color: #01264a;
        }
  }
  .allc{
    color: #01264a;
    font-weight: bold;
    text-transform: none;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px 20px;
        border-radius: 20px;
        &:hover{
            background-color: #d7e7fa;
            color: #01264a;
        }
  }
  .my-network-data{
    display: flex;
    margin-top: 10px;
  }
  .all-network-data{
    display: flex;
    margin-top: 20px;
  }
  .requested-network-data{
    display: flex;
    margin-top: 10px;
  }
  .connections-name{
    margin-left: 20px;
  }
  .connections-username{
    font-weight: bold;
    font-size: 12px;
    color: #A5A5A5;
    margin-left: 20px;
  }
  .connection-actions{
    display: flex;
    margin-left: auto;
  }
  .no-data-text{
    color: #0072e5;
    font-weight: bold;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .message-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        min-height: 400px;
        max-height: 400px;
        margin-top: 10px;
        margin-left: 0px;
        box-shadow: none;
  }
  .header{
    display: flex;
    border-bottom: 2px solid  #d7e7fa;
    padding-bottom: 10px;
}
.close-btn{
    margin-left: auto;
}
.header-text{
    margin: auto 10px;
    color: #444444;
    font-weight: bold;
}
.messages{
    max-height: 290px;
    overflow-y: auto;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
}
.text-field{
    position: fixed;
    margin-top: 360px;
    width: 460px;
}
.my-message{
    margin-left: auto; 
    max-width: 280px;
    display: flex;
    flex-direction: column;
}
.your-message{
    margin-right: auto;
    max-width: 280px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
}
.my-message-text{
    background-color: #01264a;
    color: white;
    padding: 3px 10px;
    border-radius: 10px;
    word-wrap: break-word;
}
.your-message-text{
    background-color: #0072e5;
    color: white;
    padding: 3px 10px;
    border-radius: 10px;
    word-wrap: break-word;
}
.my-timer{
    margin-left: auto;
    margin-top:5px;
    color: #A5A5A5;
    font-weight: bold;
    font-size: 10px;
    margin-right: 5px;
}
.your-timer{
    margin-right: auto;
    color: #A5A5A5;
    margin-top:5px;
    font-weight: bold;
    font-size: 10px;
    margin-left: 5px;
}
.send-btn{
  font-weight: bold;
  text-transform: none;
}
`


export default ConnectNotifications