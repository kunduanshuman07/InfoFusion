import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
const Account = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [editState, setEditState] = useState({});
  const [fieldValues, setFieldValues] = useState({});
  
  const headersData = [
    { key: 'username', label: 'IF username', defaultValue: user.username },
    { key: 'email', label: 'Email', defaultValue: user.email },
  ];

  const socialAccountsData = [
    { key: 'github', label: 'Github', defaultValue: user.github },
    { key: 'linkedin', label: 'LinkedIn', defaultValue: user.linkedin },
  ]

  const handleEdit = (key) => {
    setEditState((prevState) => ({ ...prevState, [key]: true }));
    setFieldValues((prevValues) => ({ ...prevValues, [key]: '' }));
  };

  const handleSaveEdit = async(key) => {
    const updatedValue = fieldValues[key];
    const {data} = await axios.patch(`http://localhost:3000/user/update-profile/${user._id}`, {key, value: updatedValue});
    localStorage.setItem("user", JSON.stringify(data.updatedUser));
    setEditState((prevState) => ({ ...prevState, [key]: false }));
  };

  const handleCancelEdit = (key) => {
    setEditState((prevState) => ({ ...prevState, [key]: false }));
    setFieldValues((prevValues) => ({ ...prevValues, [key]: headersData.find((header) => header.key === key).defaultValue }));
  };

  const handleFieldChange = (key, value) => {
    setFieldValues((prevValues) => ({ ...prevValues, [key]: value }));
  };
  useEffect(()=>{

  },[fieldValues])
  return (
    <Root>
       <Box className='container'>
        <Typography className='header'>Account</Typography>
        {headersData.map((header) => (
          <Box key={header.key} className='basic-info-list'>
            <Typography className='field-header'>{header.label}</Typography>
            {editState[header.key] ? (
              <Box className='edit-box'>
                <TextField
                  placeholder={`Your ${header.label.toLowerCase()}`}
                  className='text-fields'
                  size='small'
                  value={fieldValues[header.key]}
                  onChange={(e) => handleFieldChange(header.key, e.target.value)}
                />
                <Box className='actions'>
                  <Button
                    className='save-btn'
                    onClick={() => handleSaveEdit(header.key)}
                    variant='contained'
                  >
                    Save
                  </Button>
                  <Button
                    className='cancel-btn'
                    onClick={() => handleCancelEdit(header.key)}
                    variant='contained'
                    style={{ backgroundColor: '#d7e7fa' }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Typography className='field-details'>{fieldValues[header.key] || header.defaultValue}</Typography>
                <Button className='edit-btn' onClick={() => handleEdit(header.key)}>
                  Edit
                </Button>
              </>
            )}
          </Box>
        ))}
        <Typography className='header'>Social Accounts</Typography>
        {socialAccountsData.map((header) => (
          <Box key={header.key} className='basic-info-list'>
            <Typography className='field-header'>{header.label}</Typography>
            {editState[header.key] ? (
              <Box className='edit-box'>
                <TextField
                  placeholder={`Your ${header.label.toLowerCase()}`}
                  className='text-fields'
                  size='small'
                  value={fieldValues[header.key]}
                  onChange={(e) => handleFieldChange(header.key, e.target.value)}
                />
                <Box className='actions'>
                  <Button
                    className='save-btn'
                    onClick={() => handleSaveEdit(header.key)}
                    variant='contained'
                  >
                    Save
                  </Button>
                  <Button
                    className='cancel-btn'
                    onClick={() => handleCancelEdit(header.key)}
                    variant='contained'
                    style={{ backgroundColor: '#d7e7fa' }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Typography className='field-details'>{fieldValues[header.key] || header.defaultValue}</Typography>
                <Button className='edit-btn' onClick={() => handleEdit(header.key)}>
                  Edit
                </Button>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Root>
  )
}

const Root = styled.div`
    .container{
        width: 100%;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
        margin-top: -30px;
        background-color: white;
        border-radius: 5px;
        margin-left: -60px;
        padding: 10px 20px 10px 20px;
        display: flex;
        flex-direction: column;
    }
    .header{
      font-weight: bold;
      color: #444444;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .basic-info-list{
      display: flex;
      border-bottom: 1px solid #d7e7fa;
      margin-bottom: 10px;
    }
    .field-header{
      margin-top: 10px;
      width: 240px;
      font-size: 14px;
    }
    .field-details{
      margin-top: 10px;
      width: 540px;
      font-size: 14px;
    }
    .edit-btn{
      text-transform: none;
    }
    .edit-box{
      display: flex;
      flex-direction: column;
    }
    .actions{
      display: flex;
      margin-bottom: 5px;
    }
    .text-fields{
      width: 300px;
      margin-bottom: 5px;
    }
    .save-btn{
      text-transform: none;
      backgrund-color: #0072e5;
      height: 25px;
      font-size: 12px;
      font-weight: bold;
    }
    .cancel-btn{
      text-transform: none;
      color: #444444;
      height: 25px;
      margin-left: 10px;
      font-size: 12px;
      font-weight: bold;
    }
`

export default Account