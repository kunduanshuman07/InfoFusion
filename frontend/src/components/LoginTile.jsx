import { TextField, Button, Typography, Box } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const LoginTile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const { data, status } = await axios.post('http://localhost:3000/auth/login', { email, password });
            if (status === 200) {
                await localStorage.setItem("authToken", data.token);
                await localStorage.setItem("user", JSON.stringify(data.user));
                setAuth(true);
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Root>
            <form>
                <TextField
                    name="email"
                    value={email}
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder='Email Id'
                    onChange={(e) => setEmail(e.target.value)}
                    className='form-textfield'
                />
                <TextField
                    name="password"
                    value={password}
                    type='password'
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-textfield'
                />
                <Box className='footer-box'>
                    <Button
                        variant="contained"
                        className='form-submit'
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Typography className='login-signup'>New User? <a href='/signup'>SignUp</a></Typography>
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
export default LoginTile