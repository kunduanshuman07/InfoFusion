import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import NewsIcon from '@mui/icons-material/NewspaperRounded';
import Container from '@mui/material/Container';
import Logo from "../assets/InfoFusion.png";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, Tooltip } from '@mui/material';
import SupportIcon from '@mui/icons-material/SupportAgent';
import styled from "styled-components";
function AppBarComponent() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleProfile = () => {
        navigate('/profile');
    }
    const handleSettings = () => {
        navigate('/settings');
    }
    const handleLogout = () => {

    }
    const handleSupport = () => {

    }
    return (
        <Root>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "white", color: "#086D67" }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <img alt="InfoFusion" src={Logo} width={150} height="100%" onClick={()=> navigate('/')} className='logo-style'/>
                            <IconButton style={{ color: "#086D67", marginLeft: -5 }}>
                                <NewsIcon />
                            </IconButton>
                            <Box sx={{ ml: "auto" }}>
                                <IconButton title="setting" color="inherit" onClick={handleMenu}>
                                    <Avatar alt='Anshuman Kundu' src='avatar' className='avatar-style' />
                                </IconButton>
                                <Menu
                                    className='menu-style'
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                    getContentAnchorEl={null}
                                >
                                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                    <MenuItem onClick={handleSettings}>Settings</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </Box>
                            <Box>
                                <Tooltip title='Help & Support'>
                                    <IconButton className='support-style' onClick={handleSupport}><SupportIcon /></IconButton>
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
    .avatar-style{
        background-color: #086D67
    }
    .support-style{
        color: #086D67
    }
`
export default AppBarComponent