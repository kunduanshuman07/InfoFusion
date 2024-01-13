import { Box, TextField, InputLabel, Button, DialogContent, DialogTitle, Dialog, Typography} from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from "axios";
const PostUpload = ({onCloseModal}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [file, setFile] = useState();
    const [caption, setCaption] = useState('');
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('postCaption', caption);
        formData.append('userId', user._id);
        formData.append('username', user.username);
        formData.append('userName', user.name);
        formData.append('userPicturePath', user.picturePath);
        const { data, status } = await axios.post('http://localhost:3000/post/create-post', formData);
        if (status === 200) {
            onCloseModal();
        }
    }
    return (
        <Dialog open={true} onClose={onCloseModal} fullWidth>
            <DialogTitle
                sx={{
                    backgroundColor: "#01264a",
                    borderRadius: " 4px 4px 0 0",
                    fontSize: "16px",
                }}
            >
                <Box>
                    <Typography style={{ color: "white", margin: "auto", fontWeight: "bold" }}>Create Post
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent style={{ padding: "20px 25px 10px 25px" }}>
                <Root>
                    <Box>
                            <Box className="card-content-media">
                                    <Box className="fact-pic">
                                        <InputLabel className='input-label'>Image</InputLabel>
                                        <TextField
                                            size="small"
                                            type='file'
                                            placeholder="Upload Image"
                                            fullWidth
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </Box>
                                    <Box className="fact-pic">
                                        <InputLabel className='input-label'>Caption</InputLabel>
                                        <TextField
                                            size="small"
                                            placeholder="Caption"
                                            fullWidth
                                            onChange={(e) => setCaption(e.target.value)}
                                        />
                                    </Box>
                             
                            </Box>
                            <Box style={{ display: "flex", marginTop: "20px" }}>
                                <Button variant='contained' style={{ backgroundColor: "#01264a", width: "30%", margin: "auto", fontWeight: "bold" }} onClick={handleSubmit}>Submit</Button>
                                <Button variant='contained' style={{ backgroundColor: "#A5A5A5", width: "30%", margin: "auto", color: "white", fontWeight: "bold" }} onClick={onCloseModal}>Cancel</Button>
                            </Box>
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
    color: #01264a;
    font-weight: bold;
  }
  .fact-desc{
    margin-top: 20px;
  }
`;
export default PostUpload