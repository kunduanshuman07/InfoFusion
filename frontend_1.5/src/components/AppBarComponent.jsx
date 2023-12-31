import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Logo from "../assets/InfoFusion.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Tooltip, Typography } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import SupportIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from "styled-components";

export const AppBarComponent = ({ comp }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/profile/personal-info');
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    const handleSupport = () => {
        navigate('/help-support')
    }
    const handleSettings = () => {
        navigate('/settings');
    }
    return (
        <Root>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "white", color: "#086D67" }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <img alt="InfoFusion" src={Logo} width={70} height={60} onClick={() => navigate('/trending')}
                                className='logo-style' />
                            <Box style={{display: "flex", flexDirection: "column"}}>
                                <Typography className='logo-text'>INFOFUSION</Typography>
                            </Box>
                            {comp === 'profile' && <Box className='profile-btns'>
                                <IconButton style={{ color: "#086D67", marginRight: "20px" }} onClick={() => navigate('/')}>
                                    <HomeIcon />
                                </IconButton>
                                <NavLink to='/profile/personal-info' style={({ isActive }) =>
                                    (isActive ? { borderBottom: "5px solid #086D67", borderRadius: "5px" } : { color: '#086D67' })} className='profile-btn' >Personal Info</NavLink>
                                <NavLink to='/playground/quiz-dashboard' style={({ isActive }) =>
                                    (isActive ? { borderBottom: "5px solid #086D67", borderRadius: "5px" } : { color: '#086D67' })} className='profile-btn'>Quiz Dashboard</NavLink>
                            </Box>}
                            <Box sx={{ ml: "auto" }}>
                                <Tooltip title='Profile'>
                                    <IconButton color="inherit" onClick={handleProfile}>
                                        <Avatar alt={user.name} src={`http://localhost:3000/userImages/${user.picturePath}`} className='avatar-style' />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title='Settings'>
                                    <IconButton className='support-style' onClick={handleSettings} size='small'><SettingsIcon style={{ fontSize: "20px" }} /></IconButton>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title='Help & Support'>
                                    <IconButton className='support-style' onClick={handleSupport} size='small'><SupportIcon style={{ fontSize: "20px" }} /></IconButton>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title='Logout'>
                                    <Button className='logout-btn' onClick={handleLogout}>Logout</Button>
                                </Tooltip>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </Root>
    );
}

const Root = styled.div`
    .logo-style{
        cursor: pointer
    }
    .logo-text{
        color: #0072e5;
        font-size: 12px;
        border: 2px solid #d7e7fa;
        padding: 5px 10px 5px 10px;
        border-radius: 20px;
    }
    .avatar-style{
        background-color: #0072e5;
    }
    .support-style{
        color: #0072e5;
        border: 1px solid #d7e7fa;
        border-radius: 10px;
        padding: 6px;
        margin: 3px;
    }
    .profile-btns{
        margin-left: auto;
    }
    .profile-btn{
        color: #0072e5;
        margin: 35px;
        text-decoration: none;
        text-transform: none;
        padding: 7px;
        &:hover{
            color: #045350;
            font-weight: 500;
        }
    }
    .logout-btn{
        background-color: #0072e5;
        color: white;
        font-size: 10px;
        font-weight: bold;
        &:hover{
            background-color: #d7e7fa;
            color: #444444;
        }
    }
`

export default AppBarComponent;