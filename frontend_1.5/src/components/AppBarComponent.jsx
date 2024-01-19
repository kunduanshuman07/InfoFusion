import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Logo from "../assets/InfoFusion.png";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip, Typography } from '@mui/material';
import HubIcon from '@mui/icons-material/Hub';
import styled from "styled-components";
import { useAuth } from "../context/AuthProvider";
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
export const AppBarComponent = ({ comp }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { auth } = useAuth();
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate(`/profile/${user._id}`);
    }
    const handleConnections = () => {
        navigate('/connect')
    }
    return (
        <Root>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "white", color: "#086D67" }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            {auth ? <>
                                <img alt="InfoFusion" src={Logo} width={70} height={60} onClick={() => navigate('/quiz/current-quiz')}
                                    className='logo-style' />
                                <Box style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography className='logo-text'>INFOFUSION</Typography>
                                </Box>
                                <Box sx={{ ml: "auto" }}>
                                    <Tooltip title='Account'>
                                        <IconButton color="inherit" onClick={handleProfile}>
                                            <Avatar alt={user.name} src={`http://localhost:3000/userImages/${user.picturePath}`} className='avatar-style' />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box>
                                    <Tooltip title='Connect'>
                                        <IconButton className='support-style' onClick={handleConnections} size='small'><HubIcon style={{ fontSize: "20px" }} /></IconButton>
                                    </Tooltip>
                                </Box>
                            </>
                                :
                                <>
                                    <img alt="InfoFusion" src={Logo} width={70} height={60} className='logo-style' />
                                    <Box style={{ display: "flex", flexDirection: "column" }}>
                                        <Typography className='logo-text'>INFOFUSION</Typography>
                                    </Box>
                                    <Box sx={{ ml: "auto" }}>
                                        <Button startIcon={<LoginIcon/>} style={{fontWeight: "bold", textTransform: "none",borderRadius: "10px"}} variant='outlined' onClick={()=>navigate('/login')}>Login</Button>
                                        <Button startIcon={<VpnKeyIcon/>}variant='outlined' style={{fontWeight: "bold", textTransform: "none", marginLeft: "20px", borderRadius: "10px"}} onClick={()=>navigate('/signup')}>Signup</Button>
                                    </Box>
                                </>}
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