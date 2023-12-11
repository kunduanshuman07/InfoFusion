import React, { useState } from 'react';
import styled from "styled-components";
import AppBarComponent from "../components/AppBar";
import { Box, IconButton, Typography, Avatar, Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditProfile from './EditProfile';

const PersonalInfo = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <Root>
            <AppBarComponent comp={'profile'} />
            <Box className='container'>
                <Box className='profile-box'>
                    <IconButton color="inherit">
                        <Avatar alt='Anshuman Kundu' src='avatar' className='avatar-style' />
                    </IconButton>
                    <h3>Anshuman Kundu</h3>
                    <Button className='edit-profile' onClick={()=> setOpenModal(true)}>Edit Profile</Button>
                </Box>

                <Box className='info-line'>
                    <Box className='info-type'>Account Details</Box>
                    <Box className='info'>
                        <Typography>Email: abc@gmail.com</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography>Phone: 1234567890</Typography>
                    </Box>
                    <Box className='info-type'>Career Details</Box>
                    <Box className='info'>
                        <Typography>Education: NIT Bhopal</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography>Employment: Salaried</Typography>
                    </Box>
                    <Box className='info-type'>Address</Box>
                    <Box className='info'>
                        <Typography>City: Ranchi</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography>State: Jharkhand</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography>Pincode: 835204</Typography>
                    </Box>
                    <Box className='info-type'>Privacy</Box>
                    <Box className='info'>
                        <Typography className='change-pass'>Change password</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography className='delete-acc'>Delete account</Typography>
                        <IconButton size='small' className='del-btn'><DeleteIcon fontSize='small' /></IconButton>
                    </Box>
                </Box>
            </Box>
            {openModal && <EditProfile onCloseModal={() => setOpenModal(false)}/>}
        </Root>
    );
};

const Root = styled.div`
    display: flex;

    .container {
        margin: 80px;
        display: flex;
    }

    .profile-box {
        min-width: 300px;
        max-height: 200px;
        border: 2px solid #086D67;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
    }
    .info-line {
        display: flex;
        flex-direction: column;
        margin-left: 50px; 
        border-left: 10px solid #086D67;
        padding-left: 50px;
    }

    .info-type {
        font-weight: bold;
        margin-bottom: 10px;
        
    }

    .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #086D67;
        border-radius: 10px;
        min-width: 600px;
    }
    .avatar-style{
        background-color: #086D67;
    }
    .change-pass{
        text-decoration: none;
        color: blue;
        font-weight: 500;
        cursor: pointer;
    }
    .delete-acc{
        text-decoration: none;
        color: red;
        font-weight: 500;
        cursor: pointer;
    }
    .del-btn{
        color: red;
        margin-right: auto;
        margin-left: 5px;
    }
    .edit-profile{
        background-color: #086D67;
        color: white;
        font-weight: bold;
        padding: 5px 10px;
        &:hover {
            background-color: #045350;
        }
    }
`;

export default PersonalInfo;
