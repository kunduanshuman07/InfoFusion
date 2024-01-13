import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import OpinionImg from "../assets/Opinion.jpg";
import LanIcon from '@mui/icons-material/Lan';
const ConnectNotifications = () => {
  const [infoBox, setInfoBox] = useState('chat');
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
            Network
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
`


export default ConnectNotifications