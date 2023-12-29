import { Box, Typography, Card, CardContent, TextField, InputLabel, Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
const FactcheckPage = () => {
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
                  style={{ color: "#086D67" }}
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
                />
              </Box>
            </CardContent>

          </Box>
          <Button variant='contained' style={{backgroundColor: "#086D67", width: "20%", margin: "auto"}}>Submit</Button>
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
export default FactcheckPage