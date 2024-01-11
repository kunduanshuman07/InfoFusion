import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';

const BasicInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [editState, setEditState] = useState({});
  const [fieldValues, setFieldValues] = useState({});
  
  const headersData = [
    { key: 'name', label: 'Name', defaultValue: user.name },
    { key: 'gender', label: 'Gender', defaultValue: user.gender },
    { key: 'age', label: 'Age', defaultValue: user.age },
    { key: 'location', label: 'Location', defaultValue: `${user.city} ${user.state}` },
    { key: 'education', label: 'Education', defaultValue: user.education },
    { key: 'employment', label: 'Employment', defaultValue: user.employment },
  ];

  const educationOptions = [
    { value: 'Below High School', label: 'Below High School' },
    { value: 'High School', label: 'High School' },
    { value: 'Undergraduate', label: 'Undergraduate' },
    { value: 'Graduate', label: 'Graduate' },
  ];

  const employmentOptions = [
    { value: 'Unemployed', label: 'Unemployed' },
    { value: 'Selfemployed', label: 'Selfemployed' },
    { value: 'Employed', label: 'Employed' },
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
  ];

  const handleEdit = (key) => {
    setEditState((prevState) => ({ ...prevState, [key]: true }));
    setFieldValues((prevValues) => ({ ...prevValues, [key]: '' }));
  };

  const handleSaveEdit = async(key) => {
    const updatedValue = fieldValues[key];
    const { data } = await axios.patch(`http://localhost:3000/user/update-profile/${user._id}`, {key, value: updatedValue});
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

  const renderInputField = (header) => {
    if (header.key === 'education') {
      return (
        <TextField
          select
          placeholder={`Your ${header.label.toLowerCase()}`}
          className='text-fields'
          size='small'
          value={fieldValues[header.key]}
          onChange={(e) => handleFieldChange(header.key, e.target.value)}
        >
          {educationOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    if (header.key === 'employment') {
      return (
        <TextField
          select
          placeholder={`Your ${header.label.toLowerCase()}`}
          className='text-fields'
          size='small'
          value={fieldValues[header.key]}
          onChange={(e) => handleFieldChange(header.key, e.target.value)}
        >
          {employmentOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    if (header.key === 'gender') {
      return (
        <TextField
          select
          placeholder={`Your ${header.label.toLowerCase()}`}
          className='text-fields'
          size='small'
          value={fieldValues[header.key]}
          onChange={(e) => handleFieldChange(header.key, e.target.value)}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    // Default to a regular text field
    return (
      <TextField
        placeholder={`Your ${header.label.toLowerCase()}`}
        className='text-fields'
        size='small'
        value={fieldValues[header.key]}
        onChange={(e) => handleFieldChange(header.key, e.target.value)}
      />
    );
  };

  useEffect(() => {
    // ... (your existing useEffect logic)
  }, [fieldValues]);

  return (
    <Root>
      <Box className='container'>
        <Typography className='header'>Basic Info</Typography>
        {headersData.map((header) => (
          <Box key={header.key} className='basic-info-list'>
            <Typography className='field-header'>{header.label}</Typography>
            {editState[header.key] ? (
              <Box className='edit-box'>
                {renderInputField(header)}
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
  );
};

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
        height: 400px;
        margin-bottom: 20px;
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
      margin-left: -18px;
    }
    .text-fields{
      width: 300px;
      margin-bottom: 5px;
      margin-left: -18px;
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

export default BasicInfo