import React, { useState } from 'react';
import styled from "styled-components";
import AppBarComponent from "../components/AppBar";
import { Box, IconButton, Typography, Avatar, Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditProfile from './EditProfile';

const PersonalInfo = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [openModal, setOpenModal] = useState(false);
    const handleChangePassword = () => {
        console.log(user.password);
    }
    return (
        <Root>
            <AppBarComponent comp={'profile'} />
            <Box className='container'>
                <Box className='profile-box'>
                    <IconButton color="inherit">
                        <Avatar alt={user.name} src='avatar' className='avatar-style' />
                    </IconButton>
                    <h3>{user.name}</h3>
                    <Button className='edit-profile' onClick={() => setOpenModal(true)}>Edit Profile</Button>
                </Box>

                <Box className='info-line'>
                    <Box className='info-type'>Account Details</Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>Email :</span> {user.email}</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>Phone :</span> {user.phone}</Typography>
                    </Box>
                    <Box className='info-type'>Personal Details</Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>Age :</span> {user.age}</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>Gender:</span> {user.gender}</Typography>
                    </Box>
                    <Box className='info-type'>Career Details</Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>Education:</span> {user.education}</Typography>
                    </Box>
                    {user.education === "Graduate" && <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>University:</span> {user.university}</Typography>
                    </Box>}
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>Employment:</span> {user.employment}</Typography>
                    </Box>
                    <Box className='info-type'>Address</Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>City:</span> {user.city}</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>State:</span> {user.state}</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>Pincode:</span> {user.pincode}</Typography>
                    </Box>
                    <Box className='info-type'>Privacy</Box>
                    <Box className='info'>
                        <Typography className='change-pass' onClick={handleChangePassword}>Change password</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography className='delete-acc'>Delete account</Typography>
                        <IconButton size='small' className='del-btn'><DeleteIcon fontSize='small' /></IconButton>
                    </Box>
                </Box>
            </Box>
            {openModal && <EditProfile values={user} onCloseModal={() => setOpenModal(false)} />}
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
        box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
        cursor: pointer;
        &:hover {
            box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
        }
        border-left: 2px solid #086D67;
        border-radius: 5px;
        padding: 20px;
        text-align: center;
    }
    .info-line {
        display: flex;
        flex-direction: column;
        margin-left: 50px; 
        border-left: 5px solid #086D67;
        padding-left: 50px;
    }

    .info-type {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 10px;
        color: #086D67;
    }

    .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
        cursor: pointer;
        &:hover {
            box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
        }
        border-left: 2px solid #086D67;
        border-radius: 5px;
        min-width: 600px;
        color: #045350;
    }
    .avatar-style{
        background-color: #086D67;
    }
    .change-pass{
        text-decoration: none;
        color: blue;
        font-weight: bold;
        cursor: pointer;
    }
    .delete-acc{
        text-decoration: none;
        color: red;
        font-weight: bold;
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
