import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Logo from "../assets/InfoFusion.png";
import SignUp from "../components/SignUp";

const SignUpPage = () => {
  return (
    <Box>
      <Card>
        <Box>
          <img src={Logo} width={150} alt='InfoFusion'/>
          <CardContent>
            <SignUp/>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}

export default SignUpPage;