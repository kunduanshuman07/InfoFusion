import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { Box, Button, InputLabel, TextField } from '@mui/material';
import styled from 'styled-components';
const HelpSupport = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_wc69jm2", "template_jfkp92k", form.current, 'QRcx83RqeIKFrS5pe')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };
  return (
    <Root>
      <Box className='container'>
        <Box className='header'>Write your query</Box>
        <Box className='form'>
          <form ref={form}>
            <TextField type="email" name="from_name" placeholder='Your Email' fullWidth className='textfield'/>
            <TextField name="message" placeholder='Write your Query' multiline fullWidth className='textfield'/>
          </form>
          <Button onClick={sendEmail} variant='filled' style={{backgroundColor: "#086D67", color:"white", marginTop: "10px"}}>Send email</Button>
        </Box>
      </Box>
    </Root>
  )
}
const Root = styled.div`
  .container{
    margin: auto;
    margin-top: 40px;
    width: 80%;
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
  .textfield{
    margin-top: 10px;
  }
  .header{
    margin-bottom: 20px;
    color: #086D67;
    font-weight: bold;
    font-size: 20px;
  }
  .form{
    padding: 10px;
  }
`
export default HelpSupport

