import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import styled from 'styled-components';
const HelpSupport = () => {
  const [sending, setSending] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs.sendForm("service_wc69jm2", "template_jfkp92k", form.current, 'QRcx83RqeIKFrS5pe')
      .then((result) => {
        console.log(result.text);
        setSending(false);
        setSentEmail(true);
      }, (error) => {
        console.log(error.text);
      });
  };
  return (
    <Root>
      <Box className='container'>
        {sentEmail ? <Box className='header'>Thanks for reaching out. We will revert back very soon.
        Untill then browse and play.</Box> : <Box className='header'>Write your query</Box>}
        <Box className='form'>
          {!sentEmail && <form ref={form}>
            <TextField type="email" name="from_name" placeholder='Your Email' fullWidth className='textfield' />
            <TextField name="message" placeholder='Write your Query' multiline fullWidth className='textfield' />
          </form>}
          <Button onClick={sendEmail} variant='filled' style={{ backgroundColor: "#063d40", color: "white", marginTop: sentEmail? "5px": "20px", fontWeight: "bold" }}>{sending ? <CircularProgress style={{ color: "white", fontSize: "10px" }} /> :
            sentEmail ? "Email Sent" : "Send Email"}</Button>
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
    border: 2px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
  }
  .textfield{
    margin-top: 10px;
  }
  .header{
    margin-bottom: 20px;
    color: #063d40;
    font-weight: bold;
    font-size: 20px;
  }
  .form{
    padding: 10px;
  }
`
export default HelpSupport

