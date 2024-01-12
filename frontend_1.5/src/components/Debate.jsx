import { Box, Dialog, DialogTitle, DialogContent, Typography, IconButton, Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CloseIcon from "@mui/icons-material/Close";
import SnackBarComponent from "../components/SnackBarComponent";
import GroupIcon from '@mui/icons-material/Group';
const Debate = ({ motion, onCloseModal, debate }) => {
  return (
    <Dialog open={true} fullScreen onClose={onCloseModal}>
      <SnackBarComponent severity="info" message={motion==="Favor"?"You have joined in Favor of the motion!":"You have joined against the motion!"}/>
      <DialogTitle
        sx={{
          display: "flex",
          backgroundColor: "#01264a",
          fontSize: "19px",
          fontWeight: "bolder",
          height: "70px",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Box>
          <Typography style={{ color: "white", margin: "auto", fontWeight: "bold" }}>Debate id: #{debate.id}
          </Typography>
        </Box>
        <Box className='timer' style={{ display: "flex", cursor: "pointer", marginLeft: "auto", backgroundColor: "white", color: "#444444", borderRadius: "20px", fontWeight: "bolder", padding: "0px" }}>
          <IconButton onClick={onCloseModal} size='small'>
            <CloseIcon className="close-icon" style={{ fontWeight: "bolder" }} />
          </IconButton>
        </Box>

      </DialogTitle>
      <DialogContent>
        <Root>
          <Box className='container'>
            <Box className='left-container'>
              <Box className='header-container'>
                <Typography className='header'>{debate.topicName}</Typography>
                <Box className='user-btn'>
                  <Button startIcon={<GroupIcon/>} className='user-btn'>72 Active Debaters</Button>
                  <Button className='statement-btn' style={{backgroundColor: motion==="Favor"?"green": "red"}}>Pin Statement</Button>
                </Box>
              </Box>
            </Box>
            <Box className='right-container'>

            </Box>
          </Box>
        </Root>
      </DialogContent>
    </Dialog>

  )
}

const Root = styled.div`
  .container{
    display: flex;
  }
  .left-container{
    width: 80%;
  }
  .header-container{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #d7e7fa;
    padding: 10px;
  }
  .header{
    font-size: 23px;
    color: #444444;
    font-weight: bold;
    margin-top: 20px;
  }
  .user-btn{
    color: #01264a;
    text-transform: none;
    margin-top: 8px;
    font-size: 15px;
    font-weight: bold;
  }
  .statement-btn{
    margin-left: 80px;
    margin-top: 8px;
    text-transform: none;
    font-weight: bold;
    font-size: 15px;
    color: white;
    border-radius: 20px;
    width: 200px;
  }
  .right-container{
    border-left: 2px solid #d7e7fa;
    width: 20%;
  }
`

export default Debate