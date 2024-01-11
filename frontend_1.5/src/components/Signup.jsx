import { TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { verifyPasswordCriteria } from '../utils/PasswordCriteria';
import SnackBarComponent from './SnackBarComponent';
import IFLogo from "../assets/InfoFusion.png"
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(true);
  const [passwordCriteria, setPasswordCriteria] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSignUp = async () => {
    if (password === cpassword) {
      if (!verifyPasswordCriteria(password)) {
        setPasswordCriteria(false);
        setValid(false);
      }
      else {
        try {
          const userData = {
            name, email, password, username
          }
          const { data, status } = await axios.post('http://localhost:3000/auth/register', userData);
          if (status === 200) {
            console.log(data);
            navigate('/login')
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    else {
      setValid(false);
    }
  }
  return (
    <Root>
    {!valid && <SnackBarComponent severity="error" message="Password Criteria not fulfilled"/>}
      <Box className="container">
        <Typography variant="h5" className="form-header">
          Signup
        </Typography>
        <Box className="form">
          <TextField
            name="name"
            label="Full Name"
            variant="outlined"
            fullWidth
            size="small"
            placeholder='Full Name'
            className="text-field"
            onChange={(e) => setName(e.target.value)}
            
          />
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            size="small"
            placeholder='Create Username'
            className="text-field"
            onChange={(e) => setUsername(e.target.value)}
            
          />
          <TextField
            name="email"
            label="Email Id"
            variant="outlined"
            fullWidth
            size="small"
            placeholder='Email Id'
            className="text-field"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            error={!valid || !passwordCriteria}
            label={!valid ? "Password Mismatch" :!passwordCriteria? "Criteria Unfulfilled": "Password"}
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            size="small"
            placeholder='Password'
            className="text-field"
            onChange={(e) => setPassword(e.target.value)}
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
          <TextField
            error={!valid || !passwordCriteria}
            label={!valid ? "Password Mismatch" :!passwordCriteria? "Criteria Unfulfilled": "Confirm Password"}
            name="cpassword"
            type='text'
            variant="outlined"
            fullWidth
            size="small"
            placeholder='Confirm Password'
            className="text-field"
            onChange={(e) => setCPassword(e.target.value)}
          />
        </Box>
        <Box className="submit">
          <Button className="submit-btn" onClick={handleSignUp}>Signup</Button>
        </Box>
        <Box className="footer">
            <a href='/login' className="fpassword">Already a user? Login</a>
        </Box>
      </Box>
      <Box className='image'>
        <img src={IFLogo} alt='IFLogo' className='img' width={150} height={130}/>
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
  height: 500px;
  background-color: white;
  border-radius: 20px;
  margin: 30px 0px 0px auto;
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
  margin-top: 10px;
}
.submit{
  display: flex;
}
.submit-btn{
  margin: 10px auto 0px auto;
  width: 40%;
  border-radius: 20px;
  margin-top: 20px;
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
  margin-top: 15px;
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

export default Signup;
