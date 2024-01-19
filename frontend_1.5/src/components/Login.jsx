import { TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IFLogo from "../assets/InfoFusion.png";
import SnackBarComponent from "./SnackBarComponent";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    try {
      const { data, status } = await axios.post('http://localhost:3000/auth/login', { email, password });
      if (status === 200) {
        await localStorage.setItem("authToken", data.token);
        await localStorage.setItem("user", JSON.stringify(data.user));
        setAuth(true);
        setValid(true);
        navigate('/quiz/current-quiz');

      }
    } catch (error) {
      setAuth(false);
      setValid(false);
    }
  }
  return (
    <Root>
      {!valid && <SnackBarComponent severity="error" message="Invalid Credentials"/>}
      <Box className="container">
        <Typography variant="h5" className="form-header">
          Login
        </Typography>
        <Box className="form">
          <TextField
            error={!valid}
            label={!valid ? "Error" : "Email Id"}
            name="email"
            value={email}
            variant="outlined"
            fullWidth
            size="small"
            placeholder='Email Id'
            onChange={(e) => setEmail(e.target.value)}
            className="text-field"
          />
          <TextField
           error={!valid}
           label={!valid ? "Error" : "Password"}
           name="password"
           value={password}
           type={showPassword ? 'text' : 'password'}
           variant="outlined"
           fullWidth
           size="small"
           placeholder='Password'
           onChange={(e) => setPassword(e.target.value)}
           className="text-field"
           InputProps={{
               endAdornment: (
                   <InputAdornment position="end">
                       <IconButton onClick={togglePasswordVisibility} size='small'>
                           {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                       </IconButton>
                   </InputAdornment>
               )
           }}
          />
        </Box>
        <Box className="submit">
          <Button className="submit-btn" onClick={handleLogin}>Login</Button>
        </Box>
        <Box className="footer">
          <a href='/forgot-password' className="fpassword">Forgot Password</a>
          <a href='/signup' className="fpassword">New User? Signup</a>
        </Box>
      </Box>
      <Box className='image'>
        <img src={IFLogo} alt='IFLogo' className='img' width={150} height={130} />
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
  color: #444444;
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
  width: 40%;
  border-radius: 20px;
  margin-top: 40px;
  background-color: #0072e5;
  color: white;
  font-weight: bold;
  &:hover{
    background-color: #d7e7fa;
    color: #444444;
  }
}
.footer{
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
.fpassword{
  color: #444444;
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
  color: #444444;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
}
.img{
  margin: auto;
  border-radius: 40px;
}
`

export default Login;
