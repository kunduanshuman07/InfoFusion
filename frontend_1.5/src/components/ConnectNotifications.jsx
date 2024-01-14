import { Avatar, Box, Button, IconButton, Typography, TextField, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import OpinionImg from "../assets/Opinion.jpg";
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
const ConnectNotifications = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [infoBox, setInfoBox] = useState('chat');
  const [userDetailsArray, setUserDetailsArray] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [networkState, setNetworkState] = useState('mine');

  const handleSendRequest = async (connectUserId) => {
    const { data } = await axios.post('http://localhost:3000/user/send-connection-request', { actualUserId: user._id, connectionUserId: connectUserId });
    const userDetailsPromises = data?.map(user => axios.post(`http://localhost:3000/user/user-details`, { userId: user.userId }));
    const userDetailsArray = await Promise.all(userDetailsPromises);
    console.log(userDetailsArray)
    setUserDetailsArray(userDetailsArray?.map(response => response.data));
    setNetworkState('requested');
  }
  const handleDeleteRequest = async (connectUserId) => {
    const { data } = await axios.post('http://localhost:3000/user/delete-connection-request', { actualUserId: user._id, connectionUserId: connectUserId })
    const userDetailsPromises = data?.map(user => axios.post(`http://localhost:3000/user/user-details`, { userId: user.userId }));
    const userDetailsArray = await Promise.all(userDetailsPromises);
    console.log(userDetailsArray)
    setUserDetailsArray(userDetailsArray?.map(response => response.data));
    setNetworkState('all');

  }
  const handleAcceptRequest = async (connectUserId) => {
    const { data } = await axios.post('http://localhost:3000/user/approve-connection-request', { actualUserId: user._id, connectionUserId: connectUserId })
    const userDetailsPromises = data?.map(user => axios.post(`http://localhost:3000/user/user-details`, { userId: user.userId }));
    const userDetailsArray = await Promise.all(userDetailsPromises);
    console.log(userDetailsArray)
    setUserDetailsArray(userDetailsArray?.map(response => response.data));
    setNetworkState('mine');
  }
  useEffect(() => {
    const fetchAllNetworkState = async () => {
      const { data } = await axios.get('http://localhost:3000/user/all-users');
      console.log(data);
      setUserDetailsArray(data);
    }
    const fetchMyNetworkState = async () => {
      const { data } = await axios.post('http://localhost:3000/user/my-connections', { userId: user._id });
      const userDetailsPromises = data?.map(user => axios.post(`http://localhost:3000/user/user-details`, { userId: user.userId }));
      const userDetailsArray = await Promise.all(userDetailsPromises);
      console.log(userDetailsArray)
      setUserDetailsArray(userDetailsArray?.map(response => response.data));
    }
    const fetchRequestedNetworkState = async () => {
      const { data } = await axios.post('http://localhost:3000/user/requested-connections', { userId: user._id });
      const userDetailsPromises = data?.map(user => axios.post(`http://localhost:3000/user/user-details`, { userId: user.userId }));
      const userDetailsArray = await Promise.all(userDetailsPromises);
      console.log(userDetailsArray)
      setUserDetailsArray(userDetailsArray?.map(response => response.data));
    }
    const fetchRequestNetworkState = async () => {
      const { data } = await axios.post('http://localhost:3000/user/connection-requests', { userId: user._id });
      const userDetailsPromises = data?.map(user => axios.post(`http://localhost:3000/user/user-details`, { userId: user.userId }));
      const userDetailsArray = await Promise.all(userDetailsPromises);
      console.log(userDetailsArray)
      setUserDetailsArray(userDetailsArray?.map(response => response.data));
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
            <Box className='chat'>
              <Avatar src={OpinionImg} alt='' />
              <Box className='chat-header'>
                <Typography className='chat-name'>Anshuman Kundu</Typography>
                <Typography className='chat-overview'>Hi Anshuman How are you?</Typography>
              </Box>
            </Box>
            <Box className='chat'>
              <Avatar src={OpinionImg} alt='' />
              <Box className='chat-header'>
                <Typography className='chat-name'>Anshuman Kundu</Typography>
                <Typography className='chat-overview'>Hi Anshuman How are you?</Typography>
              </Box>
            </Box>
          </>
        }
        {infoBox === 'notifications' &&
          <Box className='notifications'>
            <Avatar src={OpinionImg} alt='' />
            <Box className='notify-box'>
              <Typography className='notify'>Anshuman Kundu commented on your post</Typography>
              <Typography className='notify-time'>10 minute ago</Typography>
            </Box>
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
            {networkState === 'mine' && userDetailsArray.map((user) => (
              user.connections.map((connection) => (
                <Box className='my-network-data' key={connection.userId}>
                  <Avatar src={`http://localhost:3000/userImages/${user.picturePath}`} alt={user.name} onClick={() => navigate(`/profile/${user._id}`)} />
                  <Box onClick={() => navigate(`/profile/${user._id}`)}>
                    <Typography className='connections-name'>{user.name}</Typography>
                    <Typography className='connections-username'>@{user.username}</Typography>
                  </Box>
                  <Box className='connection-actions'>
                    <IconButton><SendIcon style={{ color: '#0072e5' }} /></IconButton>
                  </Box>
                </Box>
              ))
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
                {userDetailsArray.map((users) => (
                  users._id !== user._id &&
                  <Box className='all-network-data'>
                    <Avatar src={`http://localhost:3000/userImages/${users.picturePath}`} alt={users.name} onClick={() => navigate(`/profile/${users._id}`)} />
                    <Box onClick={() => navigate(`/profile/${users._id}`)}>
                      <Typography className='connections-name'>{users.name}</Typography>
                      <Typography className='connections-username'>@{users.username}</Typography>

                    </Box>
                    <Box className='connection-actions'>
                      <IconButton onClick={() => handleSendRequest(users._id)}><PersonAddIcon style={{ color: '#0072e5' }} /></IconButton>
                    </Box>
                  </Box>
                ))}
              </>

            }
            {networkState === 'requested' &&
              userDetailsArray.length === 0 ? <Typography>No Connection Requests sent!</Typography> : userDetailsArray.map((user => (
                <Box className='requested-network-data'>
                  <Avatar src={`http://localhost:3000/userImages/${user.picturePath}`} alt={user.name} onClick={() => navigate(`/profile/${user._id}`)} />
                  <Box onClick={() => navigate(`/profile/${user._id}`)}>
                    <Typography className='connections-name'>{user.name}</Typography>
                    <Typography className='connections-username'>@{user.username}</Typography>

                  </Box>
                </Box>
              )))
            }
            {networkState === 'requests' &&
              userDetailsArray.map((user) => (
                <Box className='requested-network-data'>
                  <Avatar src={`http://localhost:3000/userImages/${user.picturePath}`} alt={user.name} onClick={() => navigate(`/profile/${user._id}`)} />
                  <Box onClick={() => navigate(`/profile/${user._id}`)}>
                    <Typography className='connections-name'>{user.name}</Typography>
                    <Typography className='connections-username'>@{user.username}</Typography>

                  </Box>
                  <Box className='connection-actions'>
                    <IconButton onClick={() => handleAcceptRequest(user._id)}><HowToRegIcon style={{ color: '#0072e5' }} /></IconButton>
                    <IconButton onClick={() => handleDeleteRequest(user._id)}><DeleteIcon style={{ color: '#0072e5' }} /></IconButton>
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
    width: 500px;
    flex-direction: column;
    margin-top: 80px;
    margin-left: 60px;
    background-color: white;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
    border: 1px solid #d7e7fa;
    padding: 10px;
    border-radius: 20px;
    cursor:pointer;
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
  .notifications{
    display: flex;
    margin-top: 15px;
  }
  .notify-box{
    margin-left: 20px;
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
`


export default ConnectNotifications