import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import IFLogo from "../assets/InfoFusion.png"
import DenseAppBar from '../components/DenseAppBar'
import Widgets from '../components/Widgets'
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import SnackBarComponent from "../components/SnackBarComponent";
const LandingPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const {auth} = useAuth();
    const navigate = useNavigate();
    const handleGetStarted = () => {
        if(auth){
            navigate('/playground')
        }
        else {
            navigate('/login')
        }
    }
    return (
        <Root>
            {auth &&<SnackBarComponent severity="success" message={`Welcome ${user.name} !`}/>}
            <DenseAppBar />
            <Box className='container'>
                <Box className='left-container'>
                    <Box className='intro'>
                        <img src={IFLogo} alt='logo' className='intro-img' />
                        <Typography className='intro-text'>Play & Compete around general awareness</Typography>
                    </Box>
                    <Button className='get-started' variant='contained' onClick={handleGetStarted}>{auth? "Explore": "Get Started"}</Button>
                </Box>
                
                <Box className='widgets'>
                    <Widgets/>
                </Box>
            </Box>
        </Root>
    )
}
const Root = styled.div`
    .container{
        display: flex;
    }
    .left-container{
        display: flex;
        flex-direction: column;
        margin: 10px auto;
        
    }
    .intro{
        margin: 150px auto 0px auto;
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
    }
    .intro-img{
        width: 120px;
        height: 100px;
        margin: 5px auto 5px auto;
        border-radius: 30px;
    }
    .intro-text{
       font-size: 20px;
       font-weight: bold;
       color: #0b4e52;
    }
    .get-started{
        width: 30%;
        border-radius: 20px;
        margin: 10px auto;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
        background-color: white;
        color: #0b4e52;
        text-transform: none;
        font-weight: bold;
        &:hover{
            background-color: #0b4e52 ;
            color: white;
        }
    }
    .widgets{
        margin: 20px auto;
        width: 550px;
        height: 400px;
        background-color: white;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
        border-radius: 60px;
        cursor: pointer;
    }
`

export default LandingPage