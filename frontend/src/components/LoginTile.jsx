import { TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const LoginTile = () => {
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
                navigate('/');

            }
        } catch (error) {
            setAuth(false);
            setValid(false);
            toast.error("Incorrect credentials")
        }
    }
    return (
        <Root>
            <ToastContainer position='top-center' />
            <form>
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
                    className='form-textfield'
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
                    className='form-textfield'
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
                <Typography className='forgot-password'><a href='/forgot-password'>Forgot password?</a></Typography>
            </form>
        </Root>
    )
}
const Root = styled.div`
    width: 100%;
    .form-submit{
      background-color: #086d67;
      color: white;
      margin-top: 15px;
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
    .error {
        animation: shake .6s linear;
    }
    .forgot-password{
      margin-left: auto;
      margin-top:10px;
    }
`;
export default LoginTile