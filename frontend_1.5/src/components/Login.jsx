import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import styled from "styled-components";
import IFLogo from "../assets/InfoFusion.png"
const Login = () => {

  return (
    <Root>
      <Box className="container">
        <Typography variant="h5" className="form-header">
          Login
        </Typography>
        <Box className="form">
          <TextField
            placeholder="username"
            label="Email"
            size="small"
            className="text-field"
          />
          <TextField
            placeholder="password"
            label="Password"
            className="text-field"
            size="small"
          />
        </Box>
        <Box className="submit">
          <Button className="submit-btn">Login</Button>
        </Box>
        <Box className="footer">
            <a href='/forgot-password' className="fpassword">Forgot Password</a>
            <a href='/signup' className="fpassword">New User? Signup</a>
        </Box>
      </Box>
      <Box className='image'>
        <img src={IFLogo} alt='IFLogo' className='img' width={200} height={50}/>
        <Typography className='intro'>Play & Compete around General Awareness !</Typography>
      </Box>
    </Root>
  );
};

const Root = styled.div`
display: flex;
flex-direction: row;
.container{
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 400px;
  background-color: white;
  border-radius: 20px;
  margin: 80px 0px 0px auto;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
  padding: 0px 20px;
  justify-content: center;
}
.form-header{
  color: #0b4e52;
  margin: 10px auto;
  font-weight: bold;
}
.form{
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.text-field{
  margin-top: 20px;
}
.submit{
  display: flex;
}
.submit-btn{
  margin: 10px auto 0px auto;
  background: linear-gradient(to right, #0b4e52, #0b4e52);
  color: white;
  width: 40%;
  border-radius: 20px;
  margin-top: 40px;
}
.footer{
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
.fpassword{
  color: #0b4e52;
  font-size: 13px;
  text-decoration: none;
  &: hover{
    text-decoration: underline;
  }
}
.image{
  display: flex;
  flex-direction: column;
  margin: auto auto auto auto;
  justify-content: center;
}
.intro{
  color: #0b4e52;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
}
.img{
  margin: auto;
}
`

export default Login;
