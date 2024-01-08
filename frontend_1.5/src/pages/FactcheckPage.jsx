import { Box, Typography, Card, CardContent, TextField, InputLabel, Button } from '@mui/material'
import React, {useState} from 'react'
import styled from 'styled-components'
import axios from "axios";
const FactcheckPage = () => {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const handleSubmit = async() =>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    await axios.post('http://localhost:3000/fcp/fake-news-detect', formData);
  }
  return (
    <Root>
      <Box>
        <Card className="card-box">
          <Box className="card-content-media">
            <CardContent className="card-content">

              <Typography className="title">A Rumor being spread. Fake or True?</Typography>
              <Box className="fact-pic">
                <InputLabel className='input-label' required>Enter picture</InputLabel>
                <TextField
                  size="small"
                  type='file'
                  placeholder="Upload Picture"
                  fullWidth
                  style={{ color: "#444444" }}
                  onChange={(e)=>setFile(e.target.files[0])}
                />
              </Box>
              <Box className='fact-desc'>
                <InputLabel className='input-label' required>Enter Description</InputLabel>
                <TextField
                  size="small"
                  name="opinion"
                  placeholder="Write or Paste description"
                  fullWidth
                  multiline
                  onChange={(e)=>{setDescription(e.target.value)}}
                />
              </Box>
            </CardContent>

          </Box>
          <Button variant='contained' style={{width: "20%", margin: "auto"}} onClick={handleSubmit} className='submit-btn'>Submit</Button>
        </Card>
      </Box>
    </Root>
  );
};
const Root = styled.div`
  .card-box {
    display: flex;
    flex-direction: column;
    margin: 20px;
    cursor: pointer;
    padding: 10px;
    border: 2px solid #d7e7fa;
    border-radius: 10px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
    margin-top: 30px;
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
    border-bottom: 2px solid #d7e7fa;
    margin: auto;
    color: #444444;
  }
  .fact-pic{
    margin-top: 20px;
  }
  .input-label{
    margin-bottom: 5px;
    color: #444444;
    font-weight: bold;
  }
  .fact-desc{
    margin-top: 20px;
  }
  .submit-btn{
    &:hover{
      background-color: #d7e7fa;
      color: #444444;
    }
  }
`;
export default FactcheckPage