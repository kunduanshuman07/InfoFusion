import { TextField, Button, Typography, Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
const LoginTile = () => {
    return (
        <Root>
            <form>
                <TextField
                    name="email"
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder='Email Id'
                    className='form-textfield'
                />
                <TextField
                    name="password"
                    type='password'
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder='Password'
                    className='form-textfield'
                />
                <Box className='footer-box'>
                    <Button
                        variant="contained"
                        className='form-submit'
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