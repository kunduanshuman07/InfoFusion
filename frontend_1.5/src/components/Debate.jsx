import { Box, Dialog, DialogTitle, DialogContent, Typography, IconButton, Button, Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CloseIcon from "@mui/icons-material/Close";
import SnackBarComponent from "../components/SnackBarComponent";
import GroupIcon from '@mui/icons-material/Group';

const Debate = ({ motion, onCloseModal, debate }) => {
  return (
    <Dialog open={true} fullScreen onClose={onCloseModal}>
      <SnackBarComponent severity="info" message={motion === "Favor" ? "You have joined in Favor of the motion!" : "You have joined against the motion!"} />
      <DialogTitle
        sx={{
          display: "flex",
          backgroundColor: "#d7e7fa",
          fontSize: "19px",
          fontWeight: "bolder",
          height: "70px",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Box>
          <Typography style={{ color: "#444444", margin: "auto", fontWeight: "bold" }}>Debate id: #{debate.id}
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
                <Typography className='header-text'>{debate.topicName}</Typography>
                <Box className='user-btn'>
                  <Button startIcon={<GroupIcon />} className='user-btn'>72 Active Debaters</Button>
                  <Button
                    className="statement-btn"
                    style={{
                      backgroundColor: motion === "Favor" ? "#01781b" : "#96050c",
                    }}
                  >
                    Pin Statement
                  </Button>

                </Box>
              </Box>
              <Box className='statement-container'>
                <Box className='favor-container'>
                  <Box className='header-favor'>
                    <Typography className='favor-text'>In Favor</Typography>
                  </Box>
                  <Box className='favor-statements'>
                    <IconButton>
                      <Avatar alt='Anshuman' src='' className='avatar' style={{ backgroundColor: "#01781b" }} />
                    </IconButton>
                    <Typography className='stat-text'>Yes, It should be implemented</Typography>
                  </Box>
                </Box>
                <Box className='against-container'>
                  <Box className='header-against'>
                    <Typography className='against-text'>Against</Typography>
                  </Box>
                  <Box className='against-statements'>
                    <IconButton>
                      <Avatar alt='Anshuman' src='' className='avatar' style={{ backgroundColor: "#96050c" }} />
                    </IconButton>
                    <Typography className='stat-text'>No, It should not be implemented</Typography>
                  </Box>
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
    margin-top: 10px;
    border: 2px solid #d7e7fa;
    border-radius: 20px;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.4);
  }
  .left-container{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .header-container{
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  .header-text{
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
  .statement-container{
    display: flex;
  }
  .favor-container{
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: 1000vh;
  }
  .against-container{
    width: 50%;
    border-left: 2px solid #d7e7fa;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: 1000vh;
  }
  .favor-text{
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    
  }
  .against-text{
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
  }
  .header-favor{
    background-color: #01781b;
    height: 50px;
  }
  .header-against{
    background-color: #96050c;
    height: 50px;
  }
  .favor-statements{
    display: flex;
  }
  .against-statements{
    display: flex;
  }
  .stat-text{
    color: #444444;
    margin: auto;
    margin-left: 10px;
    font-weight: bold;
  }
  .avatar{
    width: 30px;
    height: 30px;
  }
`

export default Debate