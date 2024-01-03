import { Box, Card, CardContent, TextField, InputLabel, Button, DialogContent, DialogTitle, Dialog, Typography} from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from "axios";
const AvatarUpload = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user._id);
    const [file, setFile] = useState();
    const handleClose = () => {
        props.onCloseModal(false);
    }
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', user._id);
        const { data, status } = await axios.patch('http://localhost:3000/user/upload-image', formData);
        if (status === 200) {
            localStorage.setItem("user", JSON.stringify(data.updatedUser));
            handleClose();
        }
    }
    return (
        <Dialog open={true} onClose={props.onCloseModal}>
            <DialogTitle
                sx={{
                    backgroundColor: "#086D67",
                    borderRadius: " 4px 4px 0 0",
                    fontSize: "16px",
                }}
            >
                <Box>
                    <Typography style={{ color: "white", margin: "auto", fontWeight: "bold" }}>Upload Picture
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent style={{ padding: "20px 25px 10px 25px" }}>
                <Root>
                    <Box>
                        <Card className="card-box">
                            <Box className="card-content-media">
                                <CardContent className="card-content">
                                    <Box className="fact-pic">
                                        <InputLabel className='input-label' required>Upload your image</InputLabel>
                                        <TextField
                                            size="small"
                                            type='file'
                                            placeholder="Upload Image"
                                            fullWidth
                                            style={{ color: "#086D67" }}
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </Box>
                                </CardContent>
                            </Box>
                            <Box style={{ display: "flex", marginTop: "10px" }}>
                                <Button variant='contained' style={{ backgroundColor: "#086D67", width: "30%", margin: "auto" }} onClick={handleSubmit}>Submit</Button>
                                <Button variant='contained' style={{ backgroundColor: "#A5A5A5", width: "30%", margin: "auto", color: "black" }} onClick={handleClose}>Cancel</Button>
                            </Box>
                        </Card>
                    </Box>
                </Root>
            </DialogContent>
        </Dialog>

    );
};
const Root = styled.div`
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
    border-bottom: 1px solid #086D67;
    margin: auto;
    color: #086D67;
  }
  .fact-pic{
    margin-top: 20px;
  }
  .input-label{
    margin-bottom: 5px;
    color: #086D67;
    font-weight: bold;
  }
  .fact-desc{
    margin-top: 20px;
  }
`;
export default AvatarUpload