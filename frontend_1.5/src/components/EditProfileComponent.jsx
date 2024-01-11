import { Box, IconButton, Avatar, Typography, TextField, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileDrawer from './ProfileDrawer';
import BasicInfo from './BasicInfo';
import Account from './Account';
import Privacy from './Privacy';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import axios from 'axios';
const EditProfileComponent = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [profileTab, setProfileTab] = useState('basicinfo');
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFileChange = async(event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('id', user._id);
        const { data, status } = await axios.patch('http://localhost:3000/user/upload-image', formData);
        if (status === 200) {
            localStorage.setItem("user", JSON.stringify(data.updatedUser));
        }
  };
  useEffect(()=>{

  },[user])
  return (
    <Root>
      <Box className='container'>
        <Box className='top-container'>
          <InputLabel For='fileInput' style={{marginTop: "20px"}}>
            <IconButton color='inherit' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} component='span'>
              <Avatar alt={user.name} src={!isHovered && `http://localhost:3000/userImages/${user.picturePath}`} className='avatar-style'>
                {isHovered && <CameraEnhanceIcon />}
              </Avatar>
            </IconButton>
          </InputLabel>
          <TextField
            id='fileInput'
            type='file'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Box className='names'>
            <Typography className='name'>{user.name}</Typography>
            <Typography className='username'>IF username: {user.username}</Typography>
          </Box>
        </Box>
        <Box className='bottom-container'>
          <Box className='bottom-left-container'>
            <ProfileDrawer profileTab={profileTab} setProfileTab={setProfileTab} />
          </Box>
          <Box className='tabs'>
            {profileTab === 'basicinfo' && <BasicInfo />}
            {profileTab === 'account' && <Account />}
            {profileTab === 'privacy' && <Privacy />}
          </Box>
        </Box>
      </Box>
    </Root>
  );
};


const Root = styled.div`
  .container{
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  .top-container{
    width: 100%;
    height: 250px;
    background-color: #01264a;
    display: flex;
  }
  .bottom-container{
    display: flex;
    width: 95%;
  }
  .bottom-left-container{
    width: 30%;
  }
  .tabs{
    width: 70%;
  }
  .avatar-style{
    width: 120px;
    height: 120px;
    border-radius: 10px;
    margin-top: 50px;
    margin-left: 130px;
  }
  .names{
    display: flex;
    flex-direction: column;
  }
  .name{
    margin-top: 120px;
    color: white;
    margin-left: 80px;
    font-size: 27px;
  }
  .username{
    margin-left: 80px;
    color: #a6a5a4;
    font-size: 14px;
  }
`

export default EditProfileComponent