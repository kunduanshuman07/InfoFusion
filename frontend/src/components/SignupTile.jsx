import { TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { verifyPasswordCriteria } from '../utils/PasswordCriteria';
const SignupTile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [age, setAge] = useState();
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
        toast.error("Your password should contain atleast 1 Uppercase, 1 lowercase, 1 special character, 1 number and should be of minimum 8 characters");
      }
      else {
        try {
          const userData = {
            name, email, password, username, age
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
      toast.error("Password Mismatch!");
    }
  }
  return (
    <Root>
      <ToastContainer position='top-center' />
      <form>
        <TextField
          name="name"
          label="Full Name"
          variant="outlined"
          fullWidth
          size="small"
          placeholder='Full Name'
          className='form-textfield'
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          size="small"
          placeholder='Create Username'
          className='form-textfield'
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="email"
          label="Email Id"
          variant="outlined"
          fullWidth
          size="small"
          placeholder='Email Id'
          className='form-textfield'
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
          className='form-textfield'
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
          className='form-textfield'
          onChange={(e) => setCPassword(e.target.value)}
        />
        <TextField
          name="age"
          label='Age'
          type='number'
          variant="outlined"
          fullWidth
          size="small"
          placeholder='Age'
          className='form-textfield'
          onChange={(e) => setAge(e.target.value)}
        />
        <Box className='footer-box'>
          <Button
            onClick={handleSignUp}
            variant="contained"
            className='form-submit'
          >
            SignUp
          </Button>
          <Typography className='login-signup'>Already have an account? <a href='/login'>Login</a></Typography>
        </Box>
      </form>
    </Root>
  )
}
const Root = styled.div`
    width: 100%;
    .form-submit{
      background-color: #086d67;
      color: white;
      margin-top: 12px;
      text-transform: none;
      &:hover {
        background-color: #045350;
      }
    }
    .form-textfield{
      margin-top: 10px;
    }
    .login-signup{
      margin-left: auto;
      margin-top:20px;
    }
    .footer-box{
        display:flex;
    }
    a{
      color: #086d67;
      font-weight: bold;
      text-decoration: none;
        &:hover{
            color: #045350;
            text-decoration: underline;
        }
    }
`;
export default SignupTile