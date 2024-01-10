import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
const Privacy = () => {
  const [editState, setEditState] = useState(false);
  const handleEdit = () => {
    setEditState(true);
  }
  const handleSaveEdit = () => {
    setEditState(false);
  }
  const handleCancelEdit = () => {
    setEditState(false);
  }
  return (
    <Root>
      <Box className='container'>
        <Typography className='header'>Privacy</Typography>
        <Box className='basic-info-list'>
          <Typography className='field-header'>Password</Typography>
          <Button className='edit-btn' onClick={handleEdit}>Change Password</Button>
        </Box>
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

export default Privacy