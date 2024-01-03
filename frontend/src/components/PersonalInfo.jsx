import React, { useState } from 'react';
import styled from "styled-components";
import AppBarComponent from "../components/AppBar";
import { Box, IconButton, Typography, Avatar, Button } from '@mui/material';
import EditProfile from './EditProfile';
import AvatarUpload from './AvatarUploadDialog';
const PersonalInfo = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [openModal, setOpenModal] = useState(false);
    const [uploadImageModal, setUploadImageModal] = useState(false);
    return (
        <Root style={{ filter: openModal ? 'blur(5px)' : 'none' }}>
            <AppBarComponent comp={'profile'} />
            <Box className='container'>
                <Box className='profile-box'>
                    <IconButton color="inherit">
                        <Avatar alt={user.name} src={`http://localhost:3000/userImages/${user.picturePath}`} className='avatar-style' onClick={() => setUploadImageModal(true)}/>
                    </IconButton>
                    <h3 style={{ color: "#086D67" }}>{user.name}</h3>
                    <Button className='edit-profile' onClick={() => setOpenModal(true)}>Edit Profile</Button>
                </Box>

                <Box className='info-line'>
                    <Box className='info-type'>Account Details</Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>Username :</span> {user.username}</Typography>
                    </Box>
                    <Box className='info'>
                        <Typography><span style={{ fontWeight: "bold" }}>Email :</span> {user.email}</Typography>
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
                </Box>
            </Box>
            {openModal && <EditProfile values={user} onCloseModal={() => setOpenModal(false)} />}
            {uploadImageModal && <AvatarUpload values={user} onCloseModal={() => setUploadImageModal(false)} />}
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
        border: 2px solid #ddd;
        border-radius: 5px;
        padding: 20px;
        text-align: center;
    }
    .info-line {
        display: flex;
        flex-direction: column;
        margin-left: 50px; 
        border-left: 5px solid #A5A5A5;
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
        border: 2px solid #ddd;
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
