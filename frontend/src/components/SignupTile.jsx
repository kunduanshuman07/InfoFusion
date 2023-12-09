import { TextField, Button, Typography, Box } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SignupTile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(0);
  const [cpassword, setCPassword] = useState('');
  const [age, setAge] = useState();
  const handleSignUp = async () => {
    if (password === cpassword) {
      try {
        const userData = {
          name, email, password, phone, age
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
    else {
      console.log("Password mismatch");
    }
  }
  return (
    <Root>
      <form>
        <TextField
          name="name"
          variant="outlined"
          fullWidth
          size="small"
          placeholder='Full Name'
          className='form-textfield'
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          name="email"
          variant="outlined"
          fullWidth
          size="small"
          placeholder='Email Id'
          className='form-textfield'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          type='password'
          variant="outlined"
          fullWidth
          size="small"
          placeholder='Password'
          className='form-textfield'
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          name="cpassword"
          type='password'
          variant="outlined"
          fullWidth
          size="small"
          placeholder='Confirm Password'
          className='form-textfield'
          onChange={(e) => setCPassword(e.target.value)}
        />
        <TextField
          name="phone"
          type='number'
          variant="outlined"
          fullWidth
          size="small"
          placeholder='Phone'
          className='form-textfield'
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          name="age"
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