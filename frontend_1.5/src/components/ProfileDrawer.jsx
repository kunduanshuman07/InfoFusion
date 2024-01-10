import React from 'react'
import Box from '@mui/material/Box';
import { IconButton, ListItem, Typography } from '@mui/material';
import styled from "styled-components"
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
const ProfileDrawer = ({ setProfileTab, profileTab }) => {
    return (
        <Root>
            <Box className='container'>
                <ListItem
                    style={{ color: profileTab === "basicinfo" ? "white" : "#444444", backgroundColor: profileTab === "basicinfo" ? "#0072e5" : "" }}
                    className='list-item'
                    onClick={() => setProfileTab("basicinfo")}
                >
                    <IconButton size='small'>
                        <InfoIcon size='small' style={{ color: profileTab === "basicinfo" ? "white" : "#444444", fontSize: "20px" }} />
                    </IconButton>
                    <Typography className='list-text'>Basic Info</Typography>
                </ListItem>
                <ListItem
                    style={{ color: profileTab === "account" ? "white" : "#444444", backgroundColor: profileTab === "account" ? "#0072e5" : "" }}
                    className='list-item'
                    onClick={() => setProfileTab("account")}
                >
                    <IconButton size='small'>
                        <AccountCircleIcon style={{ color: profileTab === "account" ? "white" : "#444444", fontSize: "20px" }} />
                    </IconButton>
                    <Typography className='list-text'>Account</Typography>
                </ListItem>
                <ListItem
                    style={{ color: profileTab === "privacy" ? "white" : "#444444", backgroundColor: profileTab === "privacy" ? "#0072e5" : "" }}
                    className='list-item'
                    onClick={() => setProfileTab("privacy")}
                >
                    <IconButton size='small'>
                        <SecurityIcon style={{ color: profileTab === "privacy" ? "white" : "#444444", fontSize: "20px" }} />
                    </IconButton>
                    <Typography className='list-text'>Privacy</Typography>
                </ListItem>
            </Box>
        </Root>
    )
}

const Root = styled.div`
    .container{
        display: flex;
        flex-direction: column;
        height: 200px;
        width: 60%;
        margin-top: 10px;
        border-radius: 5px;
        margin-left: 40px;
        // box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }
    .list-item{
        border-radius: 5px;
    }
    .list-text{
        margin-left: 10px;
        font-size: 15px;
    }
`

export default ProfileDrawer

