import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Logo from "../assets/InfoFusion.png";
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <Box>
      <Card>
        <Box>
          <img src={Logo} width={150} alt='InfoFusion'/>
          <CardContent>
            <Login/>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}

export default LoginPage