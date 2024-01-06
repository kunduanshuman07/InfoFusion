import { Box, Card, CardContent, TextField, InputLabel, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const FPDialog = (props) => {
    const [email, setEmail] = useState();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        if (confirmPassword === newPassword) {
            const passwordUpdateData = {
                email: email, newPassword: newPassword
            }
            const { data, status } = await axios.patch('http://localhost:3000/auth/update-password', passwordUpdateData);
            if (status === 200) {
                console.log(data);
                setLoading(false);
                props.onCloseModal(false);
            }
        }
    }
    return (
        <Dialog open={true} onClose={props.onCloseModal} fullWidth>
            <DialogTitle
                sx={{
                    backgroundColor: "#0a686e",
                    borderRadius: " 4px 4px 0 0",
                    fontSize: "16px",
                }}
            >
                <Box style={{ display: "flex" }}>
                    <Typography style={{ color: "white", marginRight: "auto", marginTop: "auto", fontWeight: "bold" }}>Change Password
                    </Typography>
                    <IconButton onClick={props.onCloseModal} size='small' style={{ fontWeight: "bolder", marginLeft: "auto", marginTop: "auto", color: "white" }} >
                        <CloseIcon className="close-icon" />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ padding: "20px 25px 10px 25px" }}>
                {loading ? <Typography>Password Changed succesfully</Typography> : <Root>
                    <Box className="card-content-media">
                        <Box className="fact-pic">
                            <InputLabel className='input-label' required>Enter Email Id</InputLabel>
                            <TextField
                                size="small"
                                type='email'
                                placeholder="Email Id"
                                fullWidth
                                style={{ color: "#0a686e" }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                        <Box className='fact-desc'>
                            <InputLabel className='input-label' required>New Password </InputLabel>
                            <TextField
                                size="small"
                                type='password'
                                placeholder="New Password"
                                fullWidth
                                multiline
                                onChange={(e) => { setNewPassword(e.target.value) }}
                            />
                        </Box>
                        <Box className='fact-desc'>
                            <InputLabel className='input-label' required>Confirm Password</InputLabel>
                            <TextField
                                size="small"
                                placeholder="Confirm Password"
                                fullWidth
                                multiline
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                        </Box>
                    </Box>
                    <Button variant='contained' style={{ backgroundColor: "#0a686e", width: "20%", margin: "10px auto" }} onClick={handleSubmit}>Submit</Button>
                </Root>}
            </DialogContent>
        </Dialog>
    );
};
const Root = styled.div`
display: flex;
flex-direction: column;
  .card-box {
    display: flex;
    flex-direction: column;
    margin: 20px;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
  }
  .card-content-media{
    display: flex;
    flex-direction: column;
  }
  .card-content{
    display: flex;
    flex-direction: column; 
    width: 100%;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid #0a686e;
    margin: auto;
    color: #0a686e;
  }
  .fact-pic{
    margin-top: 10px;
  }
  .input-label{
    margin-bottom: 5px;
    color: #0a686e;
    font-weight: bold;
  }
  .fact-desc{
    margin-top: 20px;
  }
`;
export default FPDialog