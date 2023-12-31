import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Logo from "../assets/InfoFusion.png";
import LoginTile from '../components/LoginTile';
import styled from "styled-components";
import { Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <Root>
      <Card className='card-container'>
        <Box>
          <CardContent>
            <LoginTile />
          </CardContent>
        </Box>
      </Card>
      <Box className='side-box'>
        <img src={Logo} width={320} alt='InfoFusion' className='logo' />
        <Typography style={{fontWeight: "bold"}}>Play & Compete around Current Affairs!</Typography>
      </Box>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  height: 90vh;
  width: 70%;
  margin-left: 140px;
  .side-box{
    margin-left: 80px;
    color: #086D67;
    text-align:center;
  }
`
export default LoginPage;